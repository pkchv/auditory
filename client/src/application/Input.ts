import { Camera } from "babylonjs";
import { Vector3Dto } from "./dto/vector3.dto";

export class Input {
    move(camera: Camera, { x, y, z }: Vector3Dto) {
        camera.position.x = x;
        camera.position.y = y;
        camera.position.z = z;
    }

    lerp() {}

}
