import { Clock } from 'colyseus';

import { Action } from '../dto/action.message';
import { Movement } from '../dto/movement.message';
import { EmitterFactory } from '../factory/emitter.factory';
import { MaterialFactory } from '../factory/material.factory';
import { MeshFactory } from '../factory/mesh.factory';
import { SoundFactory } from '../factory/sound.factory';
import { EmitterStateHandler } from '../state-handlers/emitter.state-handler';
import { Vector3Factory } from '../factory/vector3.factory';
import { Model } from 'src/entities/model.entity';

const random = require('random');

export class EmitterSimulation {

    private readonly numberOfEmitters = 35;
    private readonly factory = new EmitterFactory();
    private readonly sf = new SoundFactory();
    private readonly meshf = new MeshFactory();
    private readonly matf = new MaterialFactory();
    private readonly vf = new Vector3Factory();

    constructor(
        private readonly clock: Clock,
        private readonly emitters: EmitterStateHandler,
    ) {}

    init(): void {
        this.generateEmitters(this.numberOfEmitters)
            .map((emitter) => this.emitters.create(emitter.uuid, emitter));
    }

    update(): void {
        return null;
    }

    onMovement(clientId: string, movement: Movement): void {
        this.clock.setTimeout((numberOfEvents) => {
            for (let i = 0; i < numberOfEvents; ++i) {
                this.randomize();
            }
        },
        random.integer(10, 200), random.integer(1, 5));
    }

    onAction(clientId: string, action: Action): void {
        this.clock.setTimeout((numberOfEvents) => {
            for (let i = 0; i < numberOfEvents; ++i) {
                this.randomize();
            }
        },
        random.integer(10, 200), random.integer(1, 5));
    }

    private generateEmitters(length: number) {
        return Array.from({ length },
            (_, id) => this.factory.random());
    }

    private randomize() {
        const randomizerType = random.integer(0, 3);

        switch (randomizerType) {
            case 0:
                return this.randomizeSound();
            case 1:
                return this.randomizeMesh();
            case 2:
                return this.randomizePosition();
            default:
                return this.randomizeSound();
        }

    }

    private randomizeSound() {
        const uuid = this.emitters.random_id();
        const emitter = this.emitters.read(uuid);
        const sound = this.sf.random();
        emitter.sound = sound;
        this.emitters.update(uuid, emitter);
    }

    private randomizeMesh() {
        const uuid = this.emitters.random_id();
        const emitter = this.emitters.read(uuid);
        const mesh = this.meshf.random();
        emitter.model.mesh = mesh;
        this.emitters.update(uuid, emitter);
    }

    private randomizeMaterial() {
        const uuid = this.emitters.random_id();
        const emitter = this.emitters.read(uuid);
        const material = this.matf.random();
        emitter.model.material = material;
        this.emitters.update(uuid, emitter);
    }

    private randomizePosition() {
        const uuid = this.emitters.random_id();
        const emitter = this.emitters.read(uuid);
        const position = this.vf.random();
        emitter.model.mesh.position = position;
        this.emitters.update(uuid, emitter);
    }

    private randomizeVelocity() {
        return null;
    }

    private randomizeRotation() {
        return null;
    }

    private randomizeDirection() {
        return null;
    }

}
