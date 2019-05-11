import { Schema, type } from '@colyseus/schema';

import { Color } from './color.entity';

export class Material extends Schema {

    @type('float64')
    majorUnitFrequency: number;

    @type('float64')
    minorUnitVisibility: number;

    @type('float64')
    gridRatio: number;

    @type(Color)
    mainColor: Color;

    @type(Color)
    lineColor: Color;

    @type('float64')
    opacity: number;

    constructor(partialMaterial?: Partial<Material>) {
        super();
        Object.assign(this, partialMaterial);
    }

}
