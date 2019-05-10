import { Vector3Dto } from '../dto/vector3.dto';
import { MessageType } from './message.enum';
import { ts } from '../utility/ts';

export class Movement {
    ts: number = ts();
    type: MessageType = MessageType.Movement;
    data: {
        position: Vector3Dto;
    };

    constructor(partial?: Partial<Movement>) {
        Object.assign(this, partial);
    }

}
