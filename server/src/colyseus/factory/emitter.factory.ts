import { Emitter } from '../../entities/emitter.entity';
import { ModelFactory } from './model.factory';
import { SoundFactory } from './sound.factory';

export class EmitterFactory {

    private readonly model: ModelFactory = new ModelFactory();
    private readonly sound: SoundFactory = new SoundFactory();

    random(): Emitter {
        return new Emitter({
            model: this.model.random(),
            sound: this.sound.random(),
        });
    }

}
