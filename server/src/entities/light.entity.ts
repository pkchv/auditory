import { Schema, type } from '@colyseus/schema';

import { Color } from './color.entity';
import { Vector3 } from './vector3.entity';

export class Light extends Schema {

    @type('uint8')
    type: number = 0;

    @type(Vector3)
    position: Vector3 = new Vector3();

    @type(Color)
    color: Color = new Color();

    constructor(partialLight?: Partial<Light>) {
        super();
        Object.assign(this, partialLight);
    }

}
