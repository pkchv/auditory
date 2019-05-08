import { Color3, Engine, MeshBuilder, Scene, Vector3, VRExperienceHelper } from 'babylonjs';

import { IConfig } from './Config';
import { Network } from './Network';
import { Sandbox } from './Sandbox';
import { createGridMaterial } from './utility/create-grid-material';
import { toVector3 } from './utility/to-vector3';

export class App {

    private readonly engine: Engine;
    private readonly scene: Scene;
    private readonly network: Network;

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
        this.network.connect();
    }

    initialize(): void {
        this.initWebVR();
        this.initScene();
        this.initSandbox();
    }

    resize(): void {
      this.engine.resize();
    }

    run(): void {
        this.engine.runRenderLoop(() => this.scene.render());
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
        sphere.position.y = -(this.sandbox.size / 2) + diameter + shift;
        sphere.position.z += 100;
        sphere.material = createGridMaterial(this.scene);
        sphere['interactive'] = true;
    }

    private initWebVR() {
        this.vr = this.scene.createDefaultVRExperience();
        this.vr.enableInteractions();
        this.vr.raySelectionPredicate = () => true
        this.vr.meshSelectionPredicate = (mesh) => mesh['interactive'] || false
        this.vr.changeLaserColor(new Color3(85.0, 0, 0));
        this.vr.onNewMeshSelected.add((mesh) => {
            console.log(mesh.name);
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
        const { size } = this.config.sandbox;
        this.sandbox = new Sandbox(size, this.scene);
        this.sandbox.initializeSandbox();
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
        camera.ellipsoidOffset = toVector3(ellipsoidOffset)
        camera.speed = speed;
        camera.angularSensibility = angularSensibility;
        camera.attachControl(this.canvas, true);
    }

    private configureVRCamera() {
        const { applyGravity, checkCollisions, ellipsoid,
            ellipsoidOffset, speed } = this.config.camera;
        const size = -this.config.sandbox.size / 2 + 20;
        const initialPosition = new Vector3(0, size, 0);
        const camera = this.vr.webVRCamera;
        camera.position = initialPosition;
        camera.applyGravity = applyGravity;
        camera.checkCollisions = checkCollisions;
        camera.ellipsoid = toVector3(ellipsoid);
        camera.ellipsoidOffset = toVector3(ellipsoidOffset)
        camera.speed = speed;
        camera.attachControl(this.canvas, true);
    }

}
