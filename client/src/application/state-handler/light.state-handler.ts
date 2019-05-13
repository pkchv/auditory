import { LightController } from '../controller/light.controller';
import { LightDto } from '../dto/light.dto';
import { IStateHandler } from '../interface/IStateHandler';

export class LightStateHandler implements IStateHandler<string, LightDto> {

    constructor(
        private readonly _controller: LightController,
    ) {}

    onAdd(id: string, light: LightDto) {
        // this._controller.create(id, light);
    }

    onChange(id: string, light: LightDto) {
        // this._controller.update(id, light);
    }

    onRemove(id: string) {
        // this._controller.remove(id);
    }

}
