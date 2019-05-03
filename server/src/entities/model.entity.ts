import { Schema, type } from '@colyseus/schema';

import { Material } from './material.entity';
import { Mesh } from './mesh.entity';
import { Sound } from './sound.entity';

export class Model extends Schema {

    @type('uint16')
    id: number;

    @type(Material)
    material: Material = new Material();

    @type(Mesh)
    mesh: Mesh = new Mesh();

    @type(Sound)
    sound: Sound = new Sound();

    constructor(partialModel?: Partial<Model>) {
        super();
        Object.assign(this, partialModel);
    }

}
