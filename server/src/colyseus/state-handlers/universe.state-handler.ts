import { Logger } from '@nestjs/common';

import { Universe } from '../../entities/universe.entity';
import { EmitterStateHandler } from './emitter.state-handler';
import { LightStateHandler } from './light.state-handler';
import { PlayerStateHandler } from './player.state-handler';
import { SoundStateHandler } from './sound.state-handler';

export class UniverseStateHandler {

    // private readonly logger: Logger = new Logger(UniverseStateHandler.name);

    players: PlayerStateHandler;
    emitters: EmitterStateHandler;
    lights: LightStateHandler;

    update(): void {
        // server-side VR Experience™ loop
    }

    constructor(
        private readonly state: Universe,
    ) {
        this.players = new PlayerStateHandler(this.state.players);
        this.emitters = new EmitterStateHandler(this.state.emitters);
        this.lights = new LightStateHandler(this.state.lights);
        // this.logger.log('state handlers created');
    }

}
