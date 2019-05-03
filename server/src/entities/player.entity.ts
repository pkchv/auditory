import { Schema, type } from '@colyseus/schema';
import { generate } from 'short-uuid';
import { generateName } from 'sillyname';

import { Model } from './model.entity';

export class Player extends Schema {

    @type('number')
    id: number;

    @type('string')
    uuid: string = generate();

    @type('string')
    name: string = generateName();

    @type(Model)
    model: Model;

    constructor(partialPlayer?: Partial<Player>) {
        super();
        Object.assign(this, partialPlayer);
    }

}
