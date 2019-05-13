import { Mesh, Scene } from 'babylonjs';

import { Vector3Dto } from '../dto/vector3.dto';
import { MeshFactory } from '../factory/mesh.factory';
import { MeshDto } from '../dto/mesh.dto';
import { toVector3 } from '../utility/to-vector3';
import { computePosition } from '../utility/compute-position';
import { config } from '../config/Config';

export class MeshController {

    private readonly sandboxSize: number = config.sandbox.size;
    private readonly _factory: MeshFactory;
    private readonly _meshes: Map<string, Mesh>;

    constructor(
        private readonly scene: Scene,
    ) {
        this._factory = new MeshFactory(this.scene);
        this._meshes = new Map();
    }

    create(id: string, data: MeshDto): Mesh {
        const mesh = this._factory.create(id, data);
        this.move(mesh, data.position);
        this.rotate(mesh, data.rotation);
        this._meshes.set(id, mesh);
        return mesh;
    }

    fetch(id: string): Mesh {
        return this._meshes.get(id);
    }

    update(id: string, data: MeshDto): Mesh {
        const mesh = this._meshes.get(id);
        this.move(mesh, data.position);
        this.rotate(mesh, data.rotation);
        return mesh;
    }

    remove(id: string): void {
        const mesh = this._meshes.get(id);
        this.dispose(mesh);
        this._meshes.delete(id);
    }

    private move(mesh: Mesh, v: Vector3Dto): void {
        const p = computePosition(
            toVector3(v),
            this.sandboxSize, this.sandboxSize, this.sandboxSize,
            mesh['_width'], mesh['_height']
        );
        mesh.position = p;
    }

    private rotate(mesh: Mesh, rotation: Vector3Dto): void {
        mesh.rotation = toVector3(rotation);
    }

    private dispose(mesh: Mesh): void {
        // removes mesh from scene
        mesh.dispose();

        // informs GC it's okay to collect
        mesh = null;
    }

}