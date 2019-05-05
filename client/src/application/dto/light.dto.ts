import { ColorDto } from './color.dto';
import { Vector3Dto } from './vector3.dto';

export class LightDto {
    type: number;
    position: Vector3Dto;
    color: ColorDto;
}
