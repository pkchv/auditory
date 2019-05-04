import { Logger } from '@nestjs/common';
import { Client, Room } from 'colyseus';

import { UniverseStateHandler } from './state-handlers/universe.state-handler';
import { Universe } from 'src/entities/universe.entity';

export class GameRoom extends Room<Universe> {

    private readonly logger: Logger = new Logger(GameRoom.name);

    maxClients: number = 8;
    state: Universe;
    handler: UniverseStateHandler;

    onInit(options) {
        if (options.maxClients !== undefined) {
            this.maxClients = options.maxClients;
        }

        this.setSimulationInterval(() => this.onUpdate());
        this.state = new Universe();
        this.handler = new UniverseStateHandler(this.state);
        this.setState(this.state);
    }

    requestJoin(options) {
        return true;
    }

    onJoin(client) {
        this.handler.players.create(client.id);
    }

    onMessage(client: Client, data: any) {
        const player = this.handler.players.read(client.id);
        const serialized = JSON.stringify(data);
        this.logger.debug(`[${client.id}] [${player.name}] ${serialized}`);
    }

    onUpdate() {
        this.handler.update();
    }

    onLeave(client) {
        this.handler.players.remove(client.id);
    }

    onDispose() {
        return null;
    }

}
