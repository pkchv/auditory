import { MapSchema } from '@colyseus/schema';
import { Logger } from '@nestjs/common';

import { Emitter } from '../../entities/emitter.entity';
import { StateHandler } from './base.state-handler';

export class EmitterStateHandler implements StateHandler<string, Emitter> {

    private readonly logger: Logger = new Logger(EmitterStateHandler.name);

    constructor(
        private readonly emitters: MapSchema<Emitter>,
    ) {}

    create(uuid: string, partial?: Partial<Emitter>): Emitter {
        const emitter = new Emitter(partial);
        this.logger.log(`[${uuid}] Emitter added to universe`);
        this.logger.debug(partial);
        this.emitters[uuid] = emitter;
        return emitter;
    }

    read(uuid: string): Emitter {
        return this.emitters[uuid];
    }

    update(uuid: string, update: Partial<Emitter>): Emitter {
        this.logger.log(`[${uuid}] Emitter state updated.`);
        this.logger.debug(update);
        return Object.assign(this.emitters[uuid], update);
    }

    remove(uuid: string): void {
        this.logger.log(`[${uuid}] Emitter removed from universe`);
        delete this.emitters[uuid];
    }

}
