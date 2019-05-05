import { PlayerDto } from './player.dto';
import { SoundDto } from './sound.dto';
import { EmitterDto } from './emitter.dto';
import { LightDto } from './light.dto';

export class UniverseDto {
    players: Map<string, PlayerDto>;
    emitters: Map<string, EmitterDto>
    sounds: Map<number, SoundDto>
    lights: Map<number, LightDto>
}
