import { Schema, type } from '@colyseus/schema';

import { Vector3 } from './vector3.entity';

export class Mesh extends Schema {

    @type('uint16')
    id: number = 0;

    @type(Vector3)
    position: Vector3 = new Vector3();

    @type(Vector3)
    rotationAxis: Vector3 = new Vector3();

    @type('float64')
    angle: number = 0.0;

    constructor(partialMesh?: Partial<Mesh>) {
        super();
        Object.assign(this, partialMesh);
    }

}
