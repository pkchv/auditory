import { type, Schema } from '@colyseus/schema';

export class Color extends Schema {

    @type('float64')
    public r: number = 1;

    @type('float64')
    public g: number = 1;

    @type('float64')
    public b: number = 1;

    constructor(partialPosition?: Partial<Color>) {
        super();
        Object.assign(this, partialPosition);
    }

}
