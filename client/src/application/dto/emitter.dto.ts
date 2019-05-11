import { ModelDto } from './model.dto';
import { SoundDto } from './sound.dto';

export class EmitterDto {
    uuid: string;
    model: ModelDto;
    sound: SoundDto;
}
