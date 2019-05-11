import { ColorDto } from './color.dto';

export class MaterialDto {
    majorUnitFrequency: number;
    minorUnitVisibility: number;
    gridRatio: number;
    mainColor: ColorDto;
    lineColor: ColorDto;
    opacity: number;
}
