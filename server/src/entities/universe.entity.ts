import { MapSchema, Schema, type } from '@colyseus/schema';

import { Emitter } from './emitter.entity';
import { Light } from './light.entity';
import { Player } from './player.entity';
import { Sound } from './sound.entity';

export class Universe extends Schema {

    @type({ map: Player })
    players = new MapSchema<Player>();

    @type({ map: Emitter })
    emitters = new MapSchema<Emitter>();

    @type({ map: Sound })
    sounds = new MapSchema<Sound>();

    @type({ map: Light })
    lights = new MapSchema<Light>();

}
