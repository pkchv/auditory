import { Schema, type } from '@colyseus/schema';

import { Vector3 } from './vector3.entity';

export class Mesh extends Schema {

    @type('uint16')
    id: number = 0;

    @type('boolean')
    abstract: boolean = true;

    @type('float64')
    width: number = 0.08;

    @type('float64')
    height: number = 0.08;

    @type(Vector3)
    position: Vector3 = new Vector3();

    @type(Vector3)
    rotation: Vector3 = new Vector3();

    constructor(partialMesh?: Partial<Mesh>) {
        super();
        Object.assign(this, partialMesh);
    }

}
