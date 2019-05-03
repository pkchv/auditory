import { type, Schema } from '@colyseus/schema';

export class Vector2 extends Schema {

    static readonly origin: Vector2 = new Vector2({ x: 0, y: 0 });

    @type('number')
    public x: number;

    @type('number')
    public y: number;

    constructor(partialPosition?: Partial<Vector2>) {
        super();
        Object.assign(this, Vector2.origin, partialPosition);
    }

}
