import { EmitterDto } from './emitter.dto';
import { LightDto } from './light.dto';
import { PlayerDto } from './player.dto';

export class UniverseDto {
    players: Map<string, PlayerDto> = new Map();
    emitters: Map<string, EmitterDto>  = new Map();
    lights: Map<number, LightDto>  = new Map();
}
