import { Vector3 } from "babylonjs";
import { Vector3Dto } from '../dto/vector3.dto';

export function fromVector3(v: Vector3) {
    const { x, y, z } = v;
    return new Vector3Dto({ x, y, z });
}
