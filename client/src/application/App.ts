import { AbstractMesh, Color3, Engine, MeshBuilder, Scene, Vector3, VRExperienceHelper } from 'babylonjs';

import { CameraController } from './controller/camera.controller';
import { EmitterController } from './controller/emitter.controller';
import { LightController } from './controller/light.controller';
import { PlayerController } from './controller/player.controller';
import { Assets } from './core/assets.engine';
import { AudioEngine } from './core/audio.engine';
import { EventEngine } from './core/event.engine';
import { Network } from './core/network.engine';
import { Sandbox } from './core/sandbox';
import { StateEngine } from './core/state.engine';
import { Vector3Dto } from './dto/vector3.dto';
import { IConfig } from './interface/IConfig';
import { Action } from './message/action.message';
import { EmitterStateHandler } from './state-handler/emitter-state-handler';
import { LightStateHandler } from './state-handler/light.state-handler';
import { PlayerStateHandler } from './state-handler/player.state-handler';
import { createGridMaterial } from './utility/create-grid-material';
import { getId } from './utility/get-mesh-id';
import { toVector3 } from './utility/to-vector3';

export class App {

    private readonly engine: Engine;
    private readonly assets: Assets;
    private readonly network: Network;
    private readonly audio: AudioEngine;
    private readonly event: EventEngine;
    private readonly state: StateEngine;

    private readonly scene: Scene;
    private sandbox: Sandbox;
    private vr: VRExperienceHelper;

    private readonly camera: CameraController;
    private readonly emitters: EmitterController;
    private readonly lights: LightController;
    private readonly players: PlayerController;

    private readonly emitterState: EmitterStateHandler;
    private readonly lightState: LightStateHandler;
    private readonly playerState: PlayerStateHandler;

    private get canvas(): HTMLCanvasElement {
        return <HTMLCanvasElement> document.getElementById(this.elementId);
    }

    constructor(
        private readonly elementId: string,
        private readonly config: IConfig,
    ) {
        // TODO: object injection...

        // game engine
        this.engine = new Engine(this.canvas, true);
        this.scene = new Scene(this.engine);

        // core services
        this.network = new Network(config.server);
        this.assets = new Assets(this.scene, this.config.assets);
        this.audio = new AudioEngine(this.assets.sounds);
        this.event = new EventEngine(this.network);

        // controllers
        this.camera = new CameraController();
        this.emitters = new EmitterController(this.scene);
        this.lights = new LightController();
        this.players = new PlayerController(this.scene);

        // state handlers
        this.emitterState = new EmitterStateHandler(this.emitters);
        this.lightState = new LightStateHandler(this.lights);
        this.playerState = new PlayerStateHandler(this.players);

        this.state = new StateEngine(
            this.network,
            this.playerState,
            this.emitterState,
            this.lightState
        );
    }

    initialize(): void {
        this.network.connect();
        this.initScene();
        this.initSandbox();
        this.initWebVR();
        this.state.initStateHandlers();
        this.initMessageHandlers();
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
            this.engine.runRenderLoop(() => this.scene.render())
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
        this.vr.meshSelectionPredicate = (mesh) => mesh['_interactive'] || false
        this.vr.changeLaserColor(new Color3(85.0, 0, 0));

        this.vr.onNewMeshSelected.add((mesh: AbstractMesh) => {
            if (mesh['_isPlatform'] !== true && mesh.name !== this.sandbox.floor.name) {
                console.log('mesh picked', getId(mesh), mesh.position);
                this.event.action(getId(mesh), mesh.position);
                const sound = this.emitters._sound.get(mesh.name);
                this.audio.play(mesh.position, sound);

/*
                this.audio.play(new PlaybackDto({
                    id: 1,
                    position: fromVector3(mesh.position),
                }));
*/
            }
        });

        this.vr.onNewMeshPicked.add((pickingInfo) => {
            if (pickingInfo.pickedMesh['_isPlatform'] === true) {
                const { x, z } = pickingInfo.pickedPoint;
                const y = this.scene.activeCamera.position.y;
                const position = new Vector3Dto({ x, y, z })
                this.camera.move(this.scene.activeCamera, position);
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

    private initMessageHandlers() {
        this.network.onMessage(({ data: { meshId, position }}: Action) => {
            console.log(meshId, position);
            const sound = this.emitters._sound.get(meshId);
            this.audio.play(position, sound);
        })
    }

}
