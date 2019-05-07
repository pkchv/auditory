import 'babylonjs-materials';

import { Color3, Color4, HemisphericLight, Mesh, MeshBuilder, Scene, Vector3 } from 'babylonjs';

import { createGridMaterial } from './utility/create-grid-material';

export class Sandbox {

    private readonly light: HemisphericLight;

    constructor(
        public readonly size: number,
        private readonly scene: Scene,
    ) {
        this.scene.clearColor = new Color4(0, 0.05, 0.2, 1.0);
        this.light = new HemisphericLight('light0', new Vector3(0, 1, 0), this.scene);
    }

    private createFloorMaterial() {
        return createGridMaterial(this.scene, {
            majorUnitFrequency: 8,
            minorUnitVisibility: 1 / 4,
            gridRatio: 2,
            mainColor: new Color3(0, 0.08, 0.1),
            lineColor: new Color3(.7, .7, .7),
        })
    }

    private createWallMaterial() {
        return createGridMaterial(this.scene, {
            majorUnitFrequency: 4,
            minorUnitVisibility: 1 / 8,
            gridRatio: 0.08,
            mainColor: new Color3(0, 0.05, 0.2),
            lineColor: new Color3(0, 1.0, 1.0),
        });
    }

    initializeSandbox() {
        const size = this.size;
        const materialWall = this.createWallMaterial();
        const ground = MeshBuilder.CreateGround('ground1', { width: size, height: size }, this.scene);
        ground.position.y -= size / 2;
        ground.checkCollisions = true;
        ground.receiveShadows = true;
        ground.material = this.createFloorMaterial();

        const walls = Array.from({ length: 6}, (_, k) => k)
            .map((key) => Mesh.CreateBox("wall" + key, 1, this.scene));
        walls.forEach((wall) => {
            wall.checkCollisions = true
            wall.material = materialWall;
        });

        walls[1].scaling = new Vector3(size, 1, size);
        walls[1].position.y += size / 2;

        walls[2].scaling = new Vector3(1, size, size);
        walls[2].position.x -= size / 2;

        walls[3].scaling = new Vector3(1, size, size);
        walls[3].position.x += size / 2;

        walls[4].scaling = new Vector3(size, size, 1);
        walls[4].position.z -= size / 2;

        walls[5].scaling = new Vector3(size, size, 1);
        walls[5].position.z += size / 2;
    }
}
