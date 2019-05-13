import { IStateHandler } from '../interface/IStateHandler';
import { EmitterStateHandler } from '../state-handler/emitter-state-handler';
import { LightStateHandler } from '../state-handler/light.state-handler';
import { PlayerStateHandler } from '../state-handler/player.state-handler';
import { EntityType, ListenerType, Network } from './network.engine';

export class StateEngine {

    private readonly handlers: ListenerType[] = ['onAdd', 'onChange', 'onRemove'];

    constructor(
        private readonly network: Network,
        private readonly players: PlayerStateHandler,
        private readonly emitters: EmitterStateHandler,
        private readonly lights: LightStateHandler,
    ) {}

    initStateHandler<Id, Entity>(entityType: EntityType, handler: IStateHandler<Id, Entity>) {
        this.handlers.forEach((listenerType) => {
            this.network.attachRoomListener(
                listenerType,
                entityType,
                (entity: Entity, id: Id) => handler[listenerType](id, entity),
            );
        })
    }

    initStateHandlers() {
        this.initStateHandler('players', this.players);
        this.initStateHandler('emitters', this.emitters);
        this.initStateHandler('lights', this.lights);
    }

}