import { Logger } from '@nestjs/common';
import { Client, Room, Presence, serialize, SchemaSerializer } from 'colyseus';

import { UniverseStateHandler } from './state-handlers/universe.state-handler';
import { Universe } from '../entities/universe.entity';

@serialize(SchemaSerializer)
export class GameRoom extends Room<Universe> {

    private readonly logger: Logger = new Logger(GameRoom.name);

    maxClients: number = 8;
    handler: UniverseStateHandler;

    onInit(options) {
        if (options.maxClients !== undefined) {
            this.maxClients = options.maxClients;
        }
        this.setSimulationInterval(() => this.onUpdate());
        const universe = new Universe();
        this.setState(universe);
        this.handler = new UniverseStateHandler(universe);
    }

    requestJoin(options) {
        this.logger.debug(options);
        return true;
    }

    onAuth(options) {
        return true;
    }

    onJoin(client) {
        this.handler.players.create(client.id);
    }

    onMessage(client: Client, data: any) {
        // this.logger.debug(client);
        this.logger.debug(data);
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

    onDispose() {}

}
