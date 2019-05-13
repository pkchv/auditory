import { EmitterController } from '../controller/emitter.controller';
import { EmitterDto } from '../dto/emitter.dto';
import { IStateHandler } from '../interface/IStateHandler';

export class EmitterStateHandler implements IStateHandler<string, EmitterDto> {

    constructor(
        private readonly _controller: EmitterController,
    ) {}

    onAdd(id: string, emitter: EmitterDto) {
        this._controller.create(id, emitter);
    }

    onChange(id: string, emitter: EmitterDto) {
        this._controller.update(id, emitter);
    }

    onRemove(id: string) {
        this._controller.remove(id);
    }

}
