import { Vector3Dto } from '../dto/vector3.dto';

export interface IPlayback {
    id: number;
    distanceModel: string;
    position: Vector3Dto;
    spatialSound: boolean;
}
