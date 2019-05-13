import { Clock } from 'colyseus';

import { Action } from '../dto/action.message';
import { Movement } from '../dto/movement.message';
import { LightStateHandler } from '../state-handlers/light.state-handler';

export class LightSimulation {

    constructor(
        private readonly clock: Clock,
        private readonly lights: LightStateHandler,
    ) {}

    init(): void {
        return null;
    }

    update(): void {
        return null;
    }

    onMovement(clientId: string, movement: Movement): void {
        return null;
    }

    onAction(clientId: string, action: Action): void {
        return null;
    }

}
