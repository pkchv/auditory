import { Schema, type } from '@colyseus/schema';
import { generate } from 'short-uuid';

import { Model } from './model.entity';
import { Sound } from './sound.entity';

export class Emitter extends Schema {

    @type('string')
    uuid: string = generate();

    @type(Model)
    model: Model = new Model();

    @type(Sound)
    sound: Sound = new Sound();

    constructor(partialEmitter?: Partial<Emitter>) {
        super();
        Object.assign(this, partialEmitter);
    }

}
