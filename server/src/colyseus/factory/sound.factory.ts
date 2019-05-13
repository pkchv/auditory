import { Sound } from '../../entities/sound.entity';

const random = require('random');

export class SoundFactory {

    private readonly size: number = 66;
    private readonly maxDistance = [1000, 3000];

    random(): Sound {
        return new Sound({
            id: random.integer(1, this.size),
            distanceModelId: random.integer(1, 3),
            spatialized: true,
            maxDistance: random.integer(...this.maxDistance),
            playbackRate: random.float(0.7, 1),
        });
    }

}
