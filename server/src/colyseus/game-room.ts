import { Logger } from '@nestjs/common';
import { Client, Room } from 'colyseus';

import { Player } from '../entities/player.entity';
import { UniverseStateHandler } from './state-handlers/universe.state-handler';

export class GameRoom extends Room<UniverseStateHandler> {

    private readonly logger: Logger = new Logger(GameRoom.name);

    maxClients: number = 8;

    onInit(options) {
        if (options.maxClients !== undefined) {
            this.maxClients = options.maxClients;
        }

        this.setSimulationInterval(() => this.onUpdate());
        this.setState(new UniverseStateHandler());
    }

    requestJoin(options) {
        return true;
    }

    onJoin(client) {
        this.state.players.create(client.id);
    }

    onMessage(client: Client, data: any) {
        const player = this.state.players.read(client.id);
        const serialized = JSON.stringify(data);
        this.logger.debug(`[${client.id}] [${player.name}] ${serialized}`);
    }

    onUpdate() {
        this.state.update();
    }

    onLeave(client) {
        this.state.players.remove(client.id);
    }

    onDispose() {
        return null;
    }

}
