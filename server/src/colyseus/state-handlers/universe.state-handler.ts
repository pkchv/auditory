import { Logger } from '@nestjs/common';

import { Universe } from '../../entities/universe.entity';
import { EmitterStateHandler } from './emitter.state-handler';
import { LightStateHandler } from './light.state-handler';
import { PlayerStateHandler } from './player.state-handler';
import { SoundStateHandler } from './sound.state-handler';

export class UniverseStateHandler {

    private readonly logger: Logger = new Logger(UniverseStateHandler.name);

    state: Universe;
    players: PlayerStateHandler;
    emitters: EmitterStateHandler;
    sounds: SoundStateHandler;
    lights: LightStateHandler;

    update(): void {
        // server-side VR Experience™ loop
    }

    constructor() {
        this.state = new Universe();
        this.players = new PlayerStateHandler(this.state.players);
        this.emitters = new EmitterStateHandler(this.state.emitters);
        this.sounds = new SoundStateHandler(this.state.sounds);
        this.lights = new LightStateHandler(this.state.lights);
        this.logger.log('State object initialized');
        this.logger.log('State handlers initialized');
    }

}
