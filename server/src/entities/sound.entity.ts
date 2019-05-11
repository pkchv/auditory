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

    @type('int32')
    maxDistance: number = 100;

    @type('float64')
    playbackRate: number = 1;

    constructor(partialSound?: Partial<Sound>) {
        super();
        Object.assign(this, partialSound);
    }

}
