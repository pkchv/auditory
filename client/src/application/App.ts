import { Engine, Camera, UniversalCamera, HemisphericLight, Light, MeshBuilder, Scene, Vector3 } from "babylonjs";

import { Assets } from "./Assets";

export class App {
    private canvas: HTMLCanvasElement;
    private engine: Engine;
    private scene: Scene;
    private camera: UniversalCamera;
    private light: Light;
    private assets: Assets;

    constructor(element: string) {
        this.canvas = <HTMLCanvasElement> document.getElementById(element);
        this.engine = new Engine(this.canvas, true);
    }

    initialize(): void {
        // create a basic BJS Scene object
        this.scene = new Scene(this.engine);
        this.initializeScene(this.scene)

        this.camera = new UniversalCamera('camera', new Vector3(0, 5, -10), this.scene);

        // attach the camera to the canvas
        this.camera.attachControl(this.canvas, true);

        // create a basic light, aiming 0,1,0 - meaning, to the sky
        this.light = new HemisphericLight('light1', new Vector3(0, 1, 0), this.scene);

        // create a built-in "sphere" shape; with 16 segments and diameter of 2
        let sphere = MeshBuilder.CreateSphere('sphere1', { segments: 16, diameter: 3}, this.scene);

        // move the sphere upward 1/2 of its height
        sphere.position.y = 2;

        // create a built-in "ground" shape
        let ground = MeshBuilder.CreateGround('ground1', {width: 1024, height: 1024, subdivisions: 64}, this.scene);

        ground.position.z = -10;
    }

    resize(): void {
      this.engine.resize();
    }

    run(): void {
        this.engine.runRenderLoop(() => this.scene.render());
    }

    private initializeScene(scene: Scene) {
        scene.audioEnabled = true;
    }

}
