import { Logger } from '@nestjs/common';
import { Client, Room, SchemaSerializer, serialize } from 'colyseus';

import { Universe } from '../entities/universe.entity';
import { Action } from './dto/action.message';
import { MessageType } from './dto/message.enum';
import { Movement } from './dto/movement.message';
import { Simulation } from './simulation';
import { UniverseStateHandler } from './state-handlers/universe.state-handler';

@serialize(SchemaSerializer)
export class GameRoom extends Room<Universe> {

    private readonly logger: Logger = new Logger(GameRoom.name);

    maxClients: number = 8;
    handler: UniverseStateHandler;
    simulation: Simulation;

    onInit(options) {
        if (options.maxClients !== undefined) {
            this.maxClients = options.maxClients;
        }

        this.setSimulationInterval(() => this.onUpdate());
        const universe = new Universe();
        this.setState(universe);
        this.handler = new UniverseStateHandler(universe);
        this.simulation = new Simulation(this.handler);
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

    onAction(client: Client, action: Action) {
        this.broadcast(action, { except: client });
        this.simulation.onBroadcast(action);
    }

    onMovement(client: Client, movement: Movement) {
        this.simulation.onStateChange(client.id, movement);
    }

    onMessage(client: Client, data: Movement | Action) {
        this.logger.debug(client.id);
        this.logger.debug(data);

        switch (data.type) {
            case MessageType.Action:
                return this.onAction(client, data as Action);
            case MessageType.Movement:
                return this.onMovement(client, data as Movement);
            default:
                this.logger.error(`Invalid message: ${data}`);
        }

    }

    onUpdate() {
        this.handler.update();
    }

    onLeave(client) {
        this.handler.players.remove(client.id);
    }

}
