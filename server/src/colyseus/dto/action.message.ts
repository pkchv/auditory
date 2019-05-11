import { MessageType } from './message.enum';
import { Vector3Dto } from '../../../../client/src/application/dto/vector3.dto';

export class Action {
    ts: number;
    type: MessageType = MessageType.Action;
    data: {
        meshId: string,
        position: Vector3Dto,
    }

    constructor(partial?: Partial<Action>) {
        Object.assign(this, partial);
    }

}
