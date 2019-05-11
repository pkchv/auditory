import { MapSchema, Schema, type } from '@colyseus/schema';

import { Emitter } from './emitter.entity';
import { Light } from './light.entity';
import { Player } from './player.entity';

export class Universe extends Schema {

    @type({ map: Player })
    players: MapSchema<Player> = new MapSchema<Player>();

    @type({ map: Emitter })
    emitters: MapSchema<Emitter> = new MapSchema<Emitter>();

    @type({ map: Light })
    lights: MapSchema<Light> = new MapSchema<Light>();

}
