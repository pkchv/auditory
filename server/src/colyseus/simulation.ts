import { Action } from './dto/action.message';
import { Movement } from './dto/movement.message';
import { UniverseStateHandler } from './state-handlers/universe.state-handler';

export class Simulation {

    constructor(
        private readonly universe: UniverseStateHandler,
    ) {}

    onStateChange(clientId: string, message: Movement): void {
        return null;
    }

    onBroadcast(message: Action): void {
        return null;
    }

}
