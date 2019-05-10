import { Vector3Dto } from '../dto/vector3.dto';

export interface IConfigScene {
    audioEnabled: boolean;
    gravity: Vector3Dto;
    collisionsEnabled: boolean;
}
