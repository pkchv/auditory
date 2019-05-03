import { type, Schema } from '@colyseus/schema';

export class Color extends Schema {

    static readonly origin: Color = new Color({ r: 0, g: 0, b: 0 });

    @type('uint8')
    public r: number;

    @type('uint8')
    public g: number;

    @type('uint8')
    public b: number;

    constructor(partialPosition?: Partial<Color>) {
        super();
        Object.assign(this, Color.origin, partialPosition);
    }

}
