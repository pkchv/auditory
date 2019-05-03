import { type, Schema } from '@colyseus/schema';

export class Vector3 extends Schema {

    static readonly origin: Vector3 = new Vector3({ x: 0, y: 0, z: 0 });

    @type('number')
    public x: number;

    @type('number')
    public y: number;

    @type('number')
    public z: number;

    constructor(partialPosition?: Partial<Vector3>) {
        super();
        Object.assign(this, Vector3.origin, partialPosition);
    }

}
