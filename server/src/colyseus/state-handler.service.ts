import { Injectable, Logger } from '@nestjs/common';

import { Player } from '../entities/player.entity';
import { Universe } from '../entities/universe.entity';

@Injectable()
export class StateHandler {

    private readonly logger: Logger = new Logger(StateHandler.name);

    universe: Universe;

    update(): void {
        // server-side VR Experience™ loop
    }

    addPlayer(clientId: string, player: Player): void {
        this.logger.log(`[${clientId}] [${player.name}] Player state added to universe`);
        this.universe.players[clientId] = player;
    }

    getPlayer(clientId: string): Player {
        return this.universe.players[clientId];
    }

    removePlayer(clientId: string): void {
        const player = this.universe.players[clientId];
        this.logger.log(`[${clientId}] [${player.name}] Player state removed from universe`);
        delete this.universe.players[clientId];
    }

    constructor() {
        this.universe = new Universe();
    }

}
