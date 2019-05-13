import { Vector3 } from "babylonjs";

export function mapVector3(v: Vector3, f: (v: number) => number) {
    return new Vector3(f(v.x), f(v.y), f(v.z));
}
