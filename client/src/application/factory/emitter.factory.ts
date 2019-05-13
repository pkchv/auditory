import { Mesh, Scene } from 'babylonjs';

import { EmitterDto } from '../dto/emitter.dto';
import { SoundDto } from '../dto/sound.dto';
import { ModelFactory } from './model.factory';

export class EmitterFactory {

    private readonly _model: ModelFactory;

    constructor(
        private readonly scene: Scene,
    ) {
        this._model = new ModelFactory(this.scene);
    }

    create(id: string, data: EmitterDto): Mesh {
        const mesh = this._model.create(id, data.model);
        this.setMeshMetadata(mesh, data.sound)
        return mesh;
    }

    setMeshMetadata(mesh: Mesh, sound: SoundDto) {
        mesh['_soundMetadata'] = sound;
        mesh['_interactive'] = true;
    }

}
