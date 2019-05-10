import { Vector3Dto } from '../dto/vector3.dto';

type TDistanceModel = 'linear' | 'inverse' | 'exponential'

export class PlaybackDto {
    id: number;
    distanceModel: TDistanceModel = 'linear';
    maxDistance: number = 100;
    position: Vector3Dto = { x: 0, y: 0, z: 0 };
    spatialSound: boolean = true;
    loop: boolean = true;

    constructor(partial?: Partial<PlaybackDto>) {
        Object.assign(this, partial);
    }
}
