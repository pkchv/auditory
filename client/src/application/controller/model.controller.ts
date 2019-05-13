import { Material, Mesh, Scene } from 'babylonjs';

import { ModelDto } from '../dto/model.dto';
import { MaterialController } from './material.controller';
import { MeshController } from './mesh.controller';

export class ModelController {

    private readonly _mesh: MeshController;
    private readonly _material: MaterialController;

    constructor(
        private readonly scene: Scene,
    ) {
        this._mesh = new MeshController(this.scene);
        this._material = new MaterialController(this.scene);
    }

    create(id: string, data: ModelDto) {
        console.log('[ModelController] [create()]', id, data);
        const mesh = this._mesh.create(id, data.mesh);
        const material = this._material.create(id, data.material);
        this.updateMeshMaterial(mesh, material);
        this.scene.updateTransformMatrix();
    }

    fetch(id: string) {
        return {
            mesh: this._mesh.fetch(id),
            material: this._material.fetch(id),
        }
    }

    update(id: string, data: ModelDto) {
        this.scene.registerBeforeRender(() => {
            const mesh = this._mesh.update(id, data.mesh);
            const material = this._material.update(id, data.material);
            this.updateMeshMaterial(mesh, material);
            this.scene.updateTransformMatrix();
        });
    }

    remove(id: string) {
        this._material.remove(id);
        this._mesh.remove(id)
    }

    private updateMeshMaterial(mesh: Mesh, material: Material) {
        mesh.material = material;
    }

}
