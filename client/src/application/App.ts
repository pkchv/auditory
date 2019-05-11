import { AbstractMesh, Color3, Engine, MeshBuilder, Scene, Vector3, VRExperienceHelper } from 'babylonjs';

import { Assets } from './Assets';
import { AudioEngine } from './AudioEngine';
import { Vector3Dto } from './dto/vector3.dto';
import { EventEngine } from './EventEngine';
import { Input } from './Input';
import { IConfig } from './interfaces/IConfig';
import { Network } from './Network';
import { Sandbox } from './Sandbox';
import { createGridMaterial } from './utility/create-grid-material';
import { getId } from './utility/get-mesh-id';
import { toVector3 } from './utility/to-vector3';
import { fromVector3 } from './utility/from-vector3';
import { PlaybackDto } from './dto/playback.dto';
import { Action } from '../../../server/src/colyseus/dto/action.message';

export class App {

    private readonly engine: Engine;
    private readonly scene: Scene;
    private readonly network: Network;
    private readonly assets: Assets;
    private readonly audio: AudioEngine;
    private readonly event: EventEngine;
    private readonly input: Input;

    private sandbox: Sandbox;
    private vr: VRExperienceHelper;

    private get canvas(): HTMLCanvasElement {
        return <HTMLCanvasElement> document.getElementById(this.elementId);
    }

    constructor(
        private readonly elementId: string,
        private readonly config: IConfig,
    ) {
        this.engine = new Engine(this.canvas, true);
        this.scene = new Scene(this.engine);
        this.network = new Network(config.server);
        this.assets = new Assets(this.scene, this.config.assets);
        this.audio = new AudioEngine(this.assets.sounds);
        this.event = new EventEngine(this.network);
        this.input = new Input();
    }

    initialize(): void {
        this.network.connect();
        this.initScene();
        this.initSandbox();
        this.initWebVR();
        this.initStateHandlers();
    }

    async loadAssets() {
        await this.assets.fetch();
        this.assets.load();
    }

    resize(): void {
      this.engine.resize();
    }

    run(): void {
        this.assets.setOnFinish(() => {
            this.engine.runRenderLoop(() => this.scene.render(true))
        });
    }

    close(): void {
        this.scene.dispose();
        this.network.getClientRef().close();
    }

    addMockEntities() {
        const diameter = 20;
        const shift = 20;
        const sphere = MeshBuilder.CreateSphere('sphere0', { segments: 16, diameter }, this.scene);
        sphere.checkCollisions = true;
        sphere.position.y = -(this.config.sandbox.size / 2) + diameter + shift;
        sphere.position.z += 100;
        sphere.position.x += 1000;
        sphere.material = createGridMaterial(this.scene);
        sphere['interactive'] = true;
    }

    private initWebVR() {

        this.vr = this.scene.createDefaultVRExperience({
            rayLength: this.config.sandbox.rayLength,
        });

        this.vr.enableInteractions();
        this.vr.raySelectionPredicate = () => true
        this.vr.meshSelectionPredicate = (mesh) => mesh['interactive'] || false
        this.vr.changeLaserColor(new Color3(85.0, 0, 0));

        this.vr.onNewMeshSelected.add((mesh: AbstractMesh) => {
            if (mesh['isPlatform'] !== true && mesh.name !== this.sandbox.floor.name) {
                this.event.action(getId(mesh), mesh.position);
                this.audio.play(new PlaybackDto({
                    id: 1,
                    position: fromVector3(mesh.position),
                }));
            }
        });

        this.vr.onNewMeshPicked.add((pickingInfo) => {
            if (pickingInfo.pickedMesh['isPlatform'] === true) {
                const { x, z } = pickingInfo.pickedPoint;
                const y = this.scene.activeCamera.position.y;
                const position = new Vector3Dto({ x, y, z })
                this.input.move(this.scene.activeCamera, position);
                this.event.movement(position);
            }
        });

        this.configureCameras();
    }

    private initScene() {
        const { audioEnabled, gravity, collisionsEnabled } = this.config.scene;
        this.scene.audioEnabled = audioEnabled;
        this.scene.gravity = toVector3(gravity);
        this.scene.collisionsEnabled = collisionsEnabled;
    }

    private initSandbox() {
        this.sandbox = new Sandbox(this.config.sandbox, this.scene);
        this.sandbox.createSandbox();
    }

    private configureCameras() {
        this.configureFallbackCamera();
        this.configureVRCamera();
    }

    private configureFallbackCamera() {
        const { applyGravity, checkCollisions, ellipsoid,
            ellipsoidOffset, speed, angularSensibility } = this.config.camera;
        const size = (-this.config.sandbox.size / 2) + 50;
        const initialPosition = new Vector3(0, size, 0);
        const camera = this.vr.deviceOrientationCamera;
        camera.position = initialPosition;
        camera.applyGravity = applyGravity;
        camera.checkCollisions = checkCollisions;
        camera.ellipsoid = toVector3(ellipsoid);
        camera.ellipsoidOffset = toVector3(ellipsoidOffset);
        camera.speed = speed;
        camera.angularSensibility = angularSensibility;
        camera.inputs.clear()
        camera.detachControl(this.canvas);
    }

    private configureVRCamera() {
        const { applyGravity, checkCollisions, ellipsoid,
            ellipsoidOffset, speed, angularSensibility } = this.config.camera;
        const size = -this.config.sandbox.size / 2 + 50;
        const initialPosition = new Vector3(0, size, 0);
        const camera = this.vr.webVRCamera;
        camera.position = initialPosition;
        camera.applyGravity = applyGravity;
        camera.checkCollisions = checkCollisions;
        camera.ellipsoid = toVector3(ellipsoid);
        camera.ellipsoidOffset = toVector3(ellipsoidOffset);
        camera.speed = speed;
        camera.angularSensibility = angularSensibility;
        camera.inputs.addGamepad();
        camera.attachControl(this.canvas);
    }

    private initStateHandlers() {
        this.network.onMessage(({ data: { meshId, position }}: Action) => {
            this.audio.play(new PlaybackDto({
                id: 2,
                position: toVector3(position),
            }));
        })
    }

}
