import { SoundDto } from '../dto/sound.dto';

export class SoundController {

    private readonly _sounds: Map<string, SoundDto>;

    constructor() {
        this._sounds = new Map();
    }

    get(id: string) {
        return this._sounds.get(id);
    }

    set(id: string, data: SoundDto) {
        this._sounds.set(id, data);
    }

    remove(id: string) {
        this._sounds.delete(id);
    }

}
