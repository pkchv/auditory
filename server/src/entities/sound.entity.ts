import { Schema, type } from '@colyseus/schema';

import { Vector3 } from './vector3.entity';

export class Sound extends Schema {

    @type('uint16')
    id: number = 0;

    @type('int8')
    distanceModel: number = 0;

    @type(Vector3)
    position: Vector3 = new Vector3();

    @type('boolean')
    spatialized: boolean = true;

    @type('boolean')
    active: boolean = true;

    @type('boolean')
    loop: boolean = false;

    constructor(partialSound?: Partial<Sound>) {
        super();
        Object.assign(this, partialSound);
    }

}
