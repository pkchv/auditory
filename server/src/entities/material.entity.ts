import { Schema, type } from '@colyseus/schema';

import { Color } from './color.entity';

export class Material extends Schema {

    @type(Color)
    color: Color = new Color();

    @type('boolean')
    wireframe: boolean = false;

    @type('uint16')
    texture: number = 0;

    @type('float64')
    alpha: number = 1.0;

    constructor(partialMaterial?: Partial<Material>) {
        super();
        Object.assign(this, partialMaterial);
    }

}
