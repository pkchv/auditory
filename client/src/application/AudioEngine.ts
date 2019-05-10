import { Sound } from 'babylonjs';
import { PlaybackDto } from './dto/playback.dto';
import { toVector3 } from './utility/to-vector3';

export class AudioEngine {

    constructor(
        private readonly sounds: Map<number, Sound>,
    ) {}

    play(playback: PlaybackDto) {
        const { id } = playback;
        if (this.sounds.has(id)) {
            const {
                distanceModel, maxDistance,
                position, spatialSound, loop
            } = playback;

            const sound = this.sounds.get(id);
            sound.loop = loop;
            sound.distanceModel = distanceModel;
            sound.maxDistance = maxDistance;
            sound.spatialSound = spatialSound;
            sound.setPosition(toVector3(position));
            this.sounds.get(id).play();
        }
    }
}
