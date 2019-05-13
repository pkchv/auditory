import { Sound } from 'babylonjs';

import { SoundDto } from '../dto/sound.dto';
import { Vector3Dto } from '../dto/vector3.dto';
import { idToDistanceModel } from '../utility/id-to-distance-model';
import { toVector3 } from '../utility/to-vector3';

export class AudioEngine {

    constructor(
        private readonly sounds: Map<number, Sound>,
    ) {}

    play(_position: Vector3Dto, _sound: SoundDto) {
        const { id } = _sound;
        if (this.sounds.has(id)) {
            const sample = this.sounds.get(id);
            const position = toVector3(_position);
            const {
                distanceModelId, spatialized,
                maxDistance, playbackRate
            } = _sound;

            const distanceModel = idToDistanceModel(distanceModelId);

            sample.distanceModel = distanceModel;
            sample.maxDistance = maxDistance;
            sample.spatialSound = spatialized;
            sample.setPosition(position);
            sample.setPlaybackRate(playbackRate);
            sample.play();
        }
    }

}
