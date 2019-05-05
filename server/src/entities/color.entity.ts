import { type, Schema } from '@colyseus/schema';

export class Color extends Schema {

    @type('uint8')
    public r: number = 255;

    @type('uint8')
    public g: number = 255;

    @type('uint8')
    public b: number = 255;

    constructor(partialPosition?: Partial<Color>) {
        super();
        Object.assign(this, partialPosition);
    }

}
