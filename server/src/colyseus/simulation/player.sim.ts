import { Clock } from 'colyseus';

import { Vector3 } from '../../entities/vector3.entity';
import { Action } from '../dto/action.message';
import { Movement } from '../dto/movement.message';
import { PlayerStateHandler } from '../state-handlers/player.state-handler';

export class PlayerSimulation {

    constructor(
        private readonly clock: Clock,
        private readonly players: PlayerStateHandler,
    ) {}

    init(): void {
        return null;
    }

    update(): void {
        return null;
    }

    onMovement(clientId: string, movement: Movement): void {
        const player = this.players.read(clientId);
        player.model.mesh.position = new Vector3(movement.data.position);
        this.players.update(clientId, player);
    }

    onAction(clientId: string, action: Action): void {
        return null;
    }

}
