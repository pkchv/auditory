import { Schema, type } from '@colyseus/schema';

import { Material } from './material.entity';
import { Mesh } from './mesh.entity';

export class Model extends Schema {

    @type('uint16')
    id: number = 0;

    @type(Material)
    material: Material = new Material();

    @type(Mesh)
    mesh: Mesh = new Mesh();

    constructor(partialModel?: Partial<Model>) {
        super();
        Object.assign(this, partialModel);
    }

}
