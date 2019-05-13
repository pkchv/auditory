import { Vector3 } from '../../entities/vector3.entity';

const random = require('random');

export class Vector3Factory {

    origin(n: number = 0) {
        return new Vector3({
            x: n,
            y: n,
            z: n,
        });
    }

    random(): Vector3 {
        return new Vector3({
            x: random.float(-1, 1),
            y: random.float(-1, 1),
            z: random.float(-1, 1),
        });
    }

}
