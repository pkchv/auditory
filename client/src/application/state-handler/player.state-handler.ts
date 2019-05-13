import { PlayerController } from '../controller/player.controller';
import { PlayerDto } from '../dto/player.dto';
import { IStateHandler } from '../interface/IStateHandler';

export class PlayerStateHandler implements IStateHandler<string, PlayerDto> {

    constructor(
        private readonly _controller: PlayerController,
    ) {}

    onAdd(id: string, player: PlayerDto) {
        this._controller.create(id, player);
    }

    onChange(id: string, player: PlayerDto) {
        this._controller.update(id, player);
    }

    onRemove(id: string) {
        this._controller.remove(id);
    }

}
