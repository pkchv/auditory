import { Engine, MeshBuilder, Scene, UniversalCamera } from 'babylonjs';

import { IConfig } from './Config';
import { IFeatures } from './Features';
import { Network } from './Network';
import { Sandbox } from './Sandbox';
import { createGridMaterial } from './utility/create-grid-material';
import { toVector3 } from './utility/to-vector3';

export class App {
    private readonly canvas: HTMLCanvasElement;
    private readonly engine: Engine;
    private readonly scene: Scene;
    private readonly network: Network;

    private camera: UniversalCamera;
    private sandbox: Sandbox;

    constructor(
        element: string,
        private readonly config: IConfig,
        private readonly features: IFeatures
    ) {
        this.canvas = <HTMLCanvasElement> document.getElementById(element);
        this.engine = new Engine(this.canvas, true);
        this.scene = new Scene(this.engine);
        this.network = new Network(config.server);
        this.config = config;
        this.features = features;
    }

    initialize(): void {
        this.initScene();
        this.initSandbox();
        this.initCamera();
        this.initControls();
        this.addMockEntities();
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

    private addMockEntities() {
        const diameter = 20;
        const shift = 20;
        const sphere = MeshBuilder.CreateSphere('sphere0', { segments: 16, diameter }, this.scene);
        sphere.checkCollisions = true;
        sphere.position.y = -(this.sandbox.size / 2) + diameter + shift;
        sphere.material = createGridMaterial(this.scene);
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

    private initCamera() {
        // TODO: if WebVR change camera type
        const { initialPosition, applyGravity, checkCollisions, ellipsoid,
                ellipsoidOffset, speed, angularSensibility, gamepadAngularSensibility } = this.config.camera;
        this.camera = new UniversalCamera('camera0', toVector3(initialPosition), this.scene);
        this.camera.applyGravity = applyGravity;
        this.camera.checkCollisions = checkCollisions;
        this.camera.ellipsoid = toVector3(ellipsoid);
        this.camera.ellipsoidOffset = toVector3(ellipsoidOffset)
        this.camera.speed = speed;
        this.camera.angularSensibility = angularSensibility;
        this.camera.gamepadAngularSensibility = gamepadAngularSensibility;
    }

    private initControls() {
        // TODO: detect control type
        // attach default controls to the canvas
        this.camera.attachControl(this.canvas, true);
    }

}
