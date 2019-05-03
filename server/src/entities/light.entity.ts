import { Schema, type } from '@colyseus/schema';

import { Color } from './color.entity';
import { Vector3 } from './vector3.entity';

export class Light extends Schema {

    @type('uint8')
    type: number = 0;

    @type(Vector3)
    position: Vector3 = new Vector3({ x: 0, y: 0, z: 0 });

    @type(Color)
    color: Color = new Color({ r: 255, g: 255, b: 255});

    constructor(partialLight?: Partial<Light>) {
        super();
        Object.assign(this, partialLight);
    }

}
