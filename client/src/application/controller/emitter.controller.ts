import { Scene } from 'babylonjs';

import { EmitterDto } from '../dto/emitter.dto';
import { ModelController } from './model.controller';
import { SoundController } from './sound.controller';

export class EmitterController {

    public readonly _model: ModelController;
    public readonly _sound: SoundController;
    private readonly _emitters: Map<string, EmitterDto>

    constructor(
        private readonly scene: Scene,
    ) {
        this._model = new ModelController(this.scene);
        this._sound = new SoundController()
        this._emitters = new Map();
    }

    create(id: string, data: EmitterDto) {
        console.log('[EmitterController] [create()]', id, data);
        this._model.create(id, data.model);
        this._sound.set(id, data.sound);
    }

    update(id: string, data: EmitterDto) {
        console.log('[EmitterController] [update()]', id, data);
        this._model.update(id, data.model);
        this._sound.set(id, data.sound);
    }

    remove(id: string) {
        console.log('[EmitterController] [remove()]', id);
        this._emitters.delete(id);
        this._model.remove(id);
        this._sound.remove(id);
    }

}
