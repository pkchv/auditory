import { Vector3 } from '../../entities/vector3.entity';
import { MessageType } from './message.enum';

export class Movement {
    ts: number;
    type: MessageType = MessageType.Movement;
    data: {
        position: Vector3;
    };

    constructor(partial?: Partial<Movement>) {
        Object.assign(this, partial);
    }

}
