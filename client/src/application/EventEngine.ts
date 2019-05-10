import { Sound } from 'babylonjs';
import { Network } from './Network';
import { Vector3Dto } from './dto/vector3.dto';
import { Action } from './message/action.message';
import { Movement } from './message/movement.message';

export class EventEngine {

    constructor(
        private readonly network: Network,
    ) {}

    movement(position: Vector3Dto) {
        const message = new Movement({
            data: { position },
        });

        this.network.send(message);
    }

    action(meshId: string, position: Vector3Dto) {
        const action = new Action({
            data: {
                meshId,
                position,
            }
        });

        this.network.send(action);
    }
}
