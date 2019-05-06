import { Vector3Dto } from '../dto/vector3.dto';
import { Vector3 } from 'babylonjs';

export function toVector3(v: Vector3Dto | Array<number>) {
    if (v instanceof Array) {
        return new Vector3(...Object.assign([0, 0, 0], v.slice(0, 3)));
    }

    return new Vector3(v.x || 0, v.y || 0, v.z || 0);
}
