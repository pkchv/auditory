import { Vector3Dto } from './vector3.dto';

export class MeshDto {
    id: number;
    abstract: boolean;
    width: number;
    height: number;
    position: Vector3Dto;
    rotation: Vector3Dto;
}
