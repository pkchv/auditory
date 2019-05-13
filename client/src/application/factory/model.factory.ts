import { Scene } from 'babylonjs';

import { ModelDto } from '../dto/model.dto';
import { MaterialFactory } from './material.factory';
import { MeshFactory } from './mesh.factory';

export class ModelFactory {

    private readonly _material: MaterialFactory;
    private readonly _mesh: MeshFactory;

    constructor(
        private readonly scene: Scene,
    ) {
        this._material = new MaterialFactory(this.scene);
        this._mesh = new MeshFactory(this.scene);
    }

    create(id: string, model: ModelDto) {
        const mesh = this._mesh.create(id, model.mesh);
        const material = this._material.create(model.material);
        mesh.material = material;
        return mesh;
    }

}
