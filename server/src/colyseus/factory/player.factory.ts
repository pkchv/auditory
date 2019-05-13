import { Player } from 'src/entities/player.entity';

import { ModelFactory } from './model.factory';

export class PlayerFactory {

    private readonly model = new ModelFactory();

    random(): Player {
        return new Player({
            model: this.model.random(),
        });
    }

}
