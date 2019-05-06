import { Engine, HemisphericLight, Light, MeshBuilder, Scene, UniversalCamera, Vector3 } from 'babylonjs';

import { Assets } from './Assets';
import { IConfig, IConfigScene } from './Config';
import { IFeatures } from './Features';
import { Network } from './Network';
import { toVector3 } from './utility/to-vector3';

export class App {
    private config: IConfig;
    private features: IFeatures;
    private canvas: HTMLCanvasElement;
    private engine: Engine;
    private scene: Scene;
    private camera: UniversalCamera;
    private network: Network;
    private light: Light;
    private assets: Assets;

    constructor(element: string, config: IConfig, features: IFeatures) {
        this.canvas = <HTMLCanvasElement> document.getElementById(element);
        this.engine = new Engine(this.canvas, true);
        this.network = new Network(config.server);
        this.config = config;
        this.features = features;
    }

    initialize(): void {
        this.initializeScene();
        this.initializeCamera();
        this.initializeControls();
        this.initializeMockEntities();
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

    private initializeMockEntities() {
        // create a basic light, aiming 0,1,0 - meaning, to the sky
        new HemisphericLight('light0', new Vector3(0, 1, 0), this.scene);

        // create a built-in "sphere" shape
        const sphere = MeshBuilder.CreateSphere('sphere0', { segments: 16, diameter: 3}, this.scene);
        sphere.checkCollisions = true;

        // create a built-in "ground" shape
        const ground = MeshBuilder.CreateGround('ground1', {width: 1024, height: 1024, subdivisions: 128 }, this.scene);
        ground.position.y -= 4;
        ground.checkCollisions = true;
    }

    private initializeScene() {
        this.scene = new Scene(this.engine);
        const { audioEnabled, gravity, collisionsEnabled } = this.config.scene;
        this.scene.audioEnabled = audioEnabled;
        this.scene.gravity = toVector3(gravity);
        this.scene.collisionsEnabled = collisionsEnabled;
    }

    private initializeCamera() {
        // TODO: if WebVR change camera type
        const { initialPosition, applyGravity, checkCollisions } = this.config.camera;
        this.camera = new UniversalCamera('camera0', toVector3(initialPosition), this.scene);
        this.camera.applyGravity = applyGravity;
        this.camera.checkCollisions = checkCollisions;
    }

    private initializeControls() {
        // TODO: detect control type
        // attach default controls to the canvas
        this.camera.attachControl(this.canvas, true);
    }

}
