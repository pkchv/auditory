import 'babylonjs-materials';

import { Color3, Color4, HemisphericLight, Mesh, MeshBuilder, Scene, Vector3, StandardMaterial } from 'babylonjs';

import { createGridMaterial } from './utility/create-grid-material';
import { GridMaterial } from 'babylonjs-materials';
import { IConfigSandbox } from './Config';

export class Sandbox {

    public light: HemisphericLight;
    public ground: Mesh;
    public walls: Mesh[];
    public platforms: Mesh[];

    private readonly floorMeshId: string = "ground";
    private readonly platformMeshId: string = "platform_";
    private readonly wallMeshPrefix: string = "wall_";
    private readonly lightMeshId: string = 'light_main';

    constructor(
        public readonly config: IConfigSandbox,
        private readonly scene: Scene,
    ) {}

    createSandbox() {
        this.configureScene();
        this.light = this.createLight();
        this.ground = this.createFloor();
        this.walls = this.createWalls();

        if (this.config.createPlatforms) {
            this.platforms = this.createTeleportPlatforms(
                this.config.platforms.frequency,
                this.config.platforms.sizeReduction,
            );
        }
    }

    private configureScene() {
        this.scene.clearColor = new Color4(0, 0.05, 0.2, 1.0);
    }

    private createLight() {
        const position = new Vector3(0, 1, 0);
        return new HemisphericLight(this.lightMeshId, position, this.scene);
    }

    private createColorMaterial(color: Color3 = new Color3(0, 0.05, 0.2)) {
        const material = new StandardMaterial('floor_matterial', this.scene);
        material.diffuseColor = color;
        material.specularColor = color;
        return material;
    }

    private createFloorMaterial(mainColor = new Color3(0, 0.05, 0.2)): GridMaterial {
        return createGridMaterial(this.scene, {
            majorUnitFrequency: 8,
            minorUnitVisibility: 1 / 4,
            gridRatio: 2,
            mainColor,
            lineColor: new Color3(.7, .7, .7),
        });
    }

    private createWallMaterial(): GridMaterial {
        return createGridMaterial(this.scene, {
            majorUnitFrequency: 4,
            minorUnitVisibility: 1 / 8,
            gridRatio: 0.08,
            mainColor: new Color3(0, 0.05, 0.2),
            lineColor: new Color3(0, 1.0, 1.0),
        });
    }

    private createTeleportPlatforms(frequency: number, sizeReduction: number): Mesh[] {
        const size = this.config.size;

        const width = (size / frequency) - 2 * sizeReduction;
        const height = (size / frequency) - 2 * sizeReduction;

        const platforms: Mesh[] = [];

        for (let x = 1; x < frequency; ++x) {
            for (let z = 1; z < frequency; ++z) {
                if (x % this.config.platforms.modX === 0 && z % this.config.platforms.modZ === 0)  {
                    const platform = MeshBuilder.CreateGround(
                        `${this.platformMeshId}_${x}_${z}`,
                        { width, height },
                        this.scene,
                    );

                    const shift = 1;
                    platform.position.y += -(size / 2) + shift;
                    platform.position.x += -(size / 2) + x * (size / frequency) + sizeReduction;
                    platform.position.z += -(size / 2) + z * (size / frequency) + sizeReduction;
                    platform.checkCollisions = true;
                    platform.receiveShadows = true;
                    platform.material = this.createFloorMaterial(new Color3(0.1, 0, 0.8));
                    platform['interactive'] = true;
                    platform['isPlatform'] = true;
                    platforms.push(platform);
                }
            }
        }

        return platforms;
    }

    private createFloor(): Mesh {
        const size = this.config.size;
        const width = size;
        const height = size;
        const floor = MeshBuilder.CreateGround(
            this.floorMeshId,
            { width, height },
            this.scene,
        );

        floor.position.y -= size / 2;
        floor.checkCollisions = true;
        floor.receiveShadows = true;
        floor.material = this.createFloorMaterial();
        floor['interactive'] = true;
        floor['isPlatform'] = !this.config.createPlatforms;
        return floor;
    }

    private createWalls(): Mesh[] {
        const size = this.config.size;
        const materialWall = this.createWallMaterial();

        const walls = Array.from({ length: 5}, (_, k) => k)
            .map((key) => Mesh.CreateBox(this.wallMeshPrefix + key, 1, this.scene));

        walls.forEach((wall) => {
            wall.checkCollisions = true
            wall.material = materialWall;
        });

        walls[0].scaling = new Vector3(size, 1, size);
        walls[0].position.y += size / 2;

        walls[1].scaling = new Vector3(1, size, size);
        walls[1].position.x -= size / 2;

        walls[2].scaling = new Vector3(1, size, size);
        walls[2].position.x += size / 2;

        walls[3].scaling = new Vector3(size, size, 1);
        walls[3].position.z -= size / 2;

        walls[4].scaling = new Vector3(size, size, 1);
        walls[4].position.z += size / 2;

        return walls;
    }
}
