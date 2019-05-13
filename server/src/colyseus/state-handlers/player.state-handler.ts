import { MapSchema } from '@colyseus/schema';
import { Player } from 'src/entities/player.entity';

import { StateHandler } from './base.state-handler';
import { Logger } from '@nestjs/common';
import { PlayerFactory } from '../factory/player.factory';

export class PlayerStateHandler implements StateHandler<string, Player> {

    private readonly _factory = new PlayerFactory();
    private readonly logger: Logger = new Logger(PlayerStateHandler.name);

    constructor(
        private readonly players: MapSchema<Player>,
    ) {}

    create(clientId: string, partialPlayer?: Partial<Player>): Player {
        const player = this._factory.random();
        this.logger.log(`[${clientId}] [${player.name}] Player state added to universe`);
        this.players[clientId] = player;
        return player;
    }

    read(clientId: string): Player {
        return this.players[clientId];
    }

    update(clientId: string, update: Partial<Player>): Player {
        this.logger.log(`[${clientId}] Player state updated in universe`);
        const player = this.players[clientId];
        Object.assign(player, update);
        return player;
    }

    remove(clientId: string): void {
        const player = this.players[clientId];
        this.logger.log(`[${clientId}] [${player.name}] Player state removed from universe`);
        delete this.players[clientId];
    }

}
