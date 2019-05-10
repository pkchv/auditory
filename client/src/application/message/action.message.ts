import { Vector3Dto } from '../dto/vector3.dto';
import { MessageType } from './message.enum';
import { ts } from '../utility/ts';

export class Action {
    ts: number = ts();
    type: MessageType = MessageType.Action;
    data: {
        meshId: string,
        position: Vector3Dto,
    }

    constructor(partial?: Partial<Action>) {
        Object.assign(this, partial);
    }

}
