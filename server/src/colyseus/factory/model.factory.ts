import { Model } from '../../entities/model.entity';
import { MaterialFactory } from './material.factory';
import { MeshFactory } from './mesh.factory';

export class ModelFactory {

    private readonly material = new MaterialFactory();
    private readonly mesh = new MeshFactory();

    random(): Model {
        return new Model({
            material: this.material.random(),
            mesh: this.mesh.random(),
        });
    }

}
