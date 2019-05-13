import { Vector3 } from "babylonjs";
import { mapVector3 } from './map-vector3';
import { clamp } from './clamp';


function multiply(v1: Vector3, v2: Vector3) {
    return new Vector3(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z);
}

function computeObjectRadius(width: number, height: number) {
    return Math.sqrt(Math.pow(width , 2) + Math.pow(height, 2));
}

export function computePosition(p: Vector3, x: number, y: number, z: number, width: number, height: number): Vector3 {
    const sandbox = new Vector3(x, y, z);
    const halfSize = mapVector3(sandbox, (v) => Math.floor(v / 2))
    const radius = computeObjectRadius(width, height);
    const inbound = mapVector3(p, (v) => clamp(v, -1 + radius, 1 - radius));
    const denormalized = multiply(halfSize, inbound);
    return denormalized;
}
