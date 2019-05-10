import { Vector3Dto } from '../dto/vector3.dto';

export interface IConfigCamera {
    initialPosition: Vector3Dto;
    applyGravity: boolean;
    ellipsoid: Vector3Dto;
    ellipsoidOffset: Vector3Dto;
    checkCollisions: boolean;
    speed: number;
    angularSensibility: number;
    gamepadAngularSensibility: number;
}
