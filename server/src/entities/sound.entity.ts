import { Schema, type } from '@colyseus/schema';

import { Vector3 } from './vector3.entity';

export class Sound extends Schema {

    @type('uint16')
    id: number = 0;

    @type('int8')
    distanceModel: number = 0;

    @type(Vector3)
    position?: Vector3;

    @type('boolean')
    spatialized: boolean;

    @type('boolean')
    active: boolean;

    @type('boolean')
    loop: boolean;

    constructor(partialSound?: Partial<Sound>) {
        super();
        Object.assign(this, partialSound);
    }

}
