import { Schema } from '@colyseus/schema';

export interface StateHandler<Id, Entity extends Schema> {
    create(id: Id, entity?: Partial<Entity>): Entity;
    read(id: Id): Entity;
    update(id: Id, update: Partial<Entity>): Entity;
    remove(id: Id): void;
}
