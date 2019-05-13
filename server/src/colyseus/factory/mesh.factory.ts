import { Mesh } from '../../entities/mesh.entity';
import { Vector3Factory } from './vector3.factory';

const random = require('random');

export class MeshFactory {

    private readonly vector3 = new Vector3Factory();

    random(): Mesh {
        return new Mesh({
            id: random.integer(0, 5),
            abstract: true,
            width: random.float(0.04, 0.15),
            height: random.float(0.04, 0.15),
            position: this.vector3.random(),
            rotation: this.vector3.random(),
        });
    }

}
