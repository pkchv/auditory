import { MapSchema } from '@colyseus/schema';
import { Logger } from '@nestjs/common';

import { Sound } from '../../entities/sound.entity';
import { StateHandler } from './base.state-handler';

export class SoundStateHandler implements StateHandler<number, Sound> {

    private readonly logger: Logger = new Logger(SoundStateHandler.name);

    constructor(
        private readonly sounds: MapSchema<Sound>,
    ) {}

    create(id: number, partial?: Partial<Sound>): Sound {
        const sound = new Sound(partial);
        this.logger.log(`[${id}] Sound added to universe`);
        this.logger.debug(partial);
        this.sounds[id] = sound;
        return sound;
    }

    read(id: number): Sound {
        return this.sounds[id];
    }

    update(id: number, update: Partial<Sound>): Sound {
        this.logger.log(`[${id}] Sound state updated.`);
        this.logger.debug(update);
        return Object.assign(this.sounds[id], update);
    }

    remove(id: number): void {
        this.logger.log(`[${id}] Sound removed from universe`);
        delete this.sounds[id];
    }

}
