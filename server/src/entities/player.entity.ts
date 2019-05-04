import { Schema, type } from '@colyseus/schema';
import { generate } from 'short-uuid';
import { generate as name } from 'namor';

import { Model } from './model.entity';

export class Player extends Schema {

    @type('number')
    id: number;

    @type('string')
    uuid: string = generate();

    @type('string')
    name: string = name({ word: 2, numbers: 0 });

    @type(Model)
    model: Model;

    constructor(partialPlayer?: Partial<Player>) {
        super();
        Object.assign(this, partialPlayer);
    }

}
