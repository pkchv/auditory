import { Vector3Dto } from './vector3.dto';

export class MeshDto {
    id: number;
    abstract: boolean;
    position: Vector3Dto;
    rotationAxis: Vector3Dto;
    angle: number;
}
