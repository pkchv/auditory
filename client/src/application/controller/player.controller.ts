import { Material, Mesh, Scene } from 'babylonjs';

import { config } from '../config/Config';
import { PlayerDto } from '../dto/player.dto';
import { Vector3Dto } from '../dto/vector3.dto';
import { MaterialFactory } from '../factory/material.factory';
import { MeshFactory } from '../factory/mesh.factory';
import { toVector3 } from '../utility/to-vector3';

export class PlayerController {

    private readonly _meshf: MeshFactory;
    private readonly _matf: MaterialFactory;

    private readonly sandboxSize: number = config.sandbox.size;
    private readonly _playerMesh: Map<string, Mesh>;
    private readonly _playerMaterial: Map<string, Material>;

    constructor(
        private readonly scene: Scene,
    ) {
        this._meshf = new MeshFactory(this.scene);
        this._matf = new MaterialFactory(this.scene);
        this._playerMesh = new Map();
        this._playerMaterial = new Map();
    }

    create(id: string, data: PlayerDto): void {
        const mesh = this._meshf.createPlayer(id, data.model.mesh);
        const material = this._matf.create(data.model.material);
        mesh.material = material;

        this.move(mesh, data.model.mesh.position);
        this.rotate(mesh, data.model.mesh.rotation);

        this._playerMesh.set(id, mesh);
        this._playerMaterial.set(id, material);
    }

    update(id: string, data: PlayerDto): void {
        const mesh = this._playerMesh.get(id);
        this.move(mesh, data.model.mesh.position);
        this.rotate(mesh, data.model.mesh.rotation);
    }

    remove(id: string): void {
        const mesh = this._playerMesh.get(id);
        const material = this._playerMaterial.get(id);

        this.dispose(mesh);
        this.dispose(material);
        this._playerMesh.delete(id);
        this._playerMaterial.delete(id);
    }

    private move(mesh: Mesh, v: Vector3Dto): void {
        mesh.position = toVector3(v);
        mesh.position.y = (-this.sandboxSize / 2) + 85;
    }

    private rotate(mesh: Mesh, rotation: Vector3Dto): void {
        // mesh.rotation = toVector3(rotation);
    }

    private dispose(obj: Mesh | Material): void {
        // removes mesh from scene
        obj.dispose();

        // informs GC it's okay to collect
        obj = null;
    }

}
