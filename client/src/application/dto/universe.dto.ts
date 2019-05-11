import { EmitterDto } from './emitter.dto';
import { LightDto } from './light.dto';
import { PlayerDto } from './player.dto';

export class UniverseDto {
    players: Map<string, PlayerDto>;
    emitters: Map<string, EmitterDto>
    lights: Map<number, LightDto>
}
