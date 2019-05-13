import { Clock } from 'colyseus';

import { Action } from './dto/action.message';
import { Movement } from './dto/movement.message';
import { EmitterSimulation } from './simulation/emitter.sim';
import { LightSimulation } from './simulation/light.sim';
import { PlayerSimulation } from './simulation/player.sim';
import { UniverseStateHandler } from './state-handlers/universe.state-handler';

export class Simulation {

    private readonly emitter: EmitterSimulation;
    private readonly light: LightSimulation;
    private readonly player: PlayerSimulation;

    constructor(
        private readonly clock: Clock,
        private readonly universe: UniverseStateHandler,
    ) {
        this.emitter = new EmitterSimulation(this.clock, this.universe.emitters);
        this.light = new LightSimulation(this.clock, this.universe.lights);
        this.player = new PlayerSimulation(this.clock, this.universe.players);
    }

    init() {
        this.emitter.init();
        this.light.init();
        this.player.init();
    }

    update() {
        this.emitter.update();
        this.light.update();
        this.player.update();
    }

    onMovement(clientId: string, movement: Movement): void {
        this.emitter.onMovement(clientId, movement);
        this.light.onMovement(clientId, movement);
        this.player.onMovement(clientId, movement);
    }

    onAction(clientId: string, action: Action): void {
        this.emitter.onAction(clientId, action);
        this.light.onAction(clientId, action);
        this.player.onAction(clientId, action);
    }

}
