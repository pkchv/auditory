import { MapSchema } from '@colyseus/schema';
import { Logger } from '@nestjs/common';

import { Light } from '../../entities/light.entity';
import { StateHandler } from './base.state-handler';

export class LightStateHandler implements StateHandler<number, Light> {

    private readonly logger: Logger = new Logger(LightStateHandler.name);

    constructor(
        private readonly lights: MapSchema<Light>,
    ) {}

    create(id: number, partial?: Partial<Light>): Light {
        const light = new Light(partial);
        this.logger.log(`[${id}] Light added to universe`);
        this.logger.debug(partial);
        this.lights[id] = light;
        return light;
    }

    read(id: number): Light {
        return this.lights[id];
    }

    update(id: number, update: Partial<Light>): Light {
        this.logger.log(`[${id}] Light state updated.`);
        this.logger.debug(update);
        return Object.assign(this.lights[id], update);
    }

    remove(id: number): void {
        this.logger.log(`[${id}] Light removed from universe`);
        delete this.lights[id];
    }

}
