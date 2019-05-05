import { type, Schema } from '@colyseus/schema';

export class Vector3 extends Schema {

    @type('number')
    public x: number = 0;

    @type('number')
    public y: number = 0;

    @type('number')
    public z: number = 0;

    constructor(partialPosition?: Partial<Vector3>) {
        super();
        Object.assign(this, partialPosition);
    }

}
