
export interface IStateHandler<Id, Entity> {
    onAdd(id: Id, entity: Entity): void;
    onChange(id: Id, entity: Entity): void;
    onRemove(id: Id, entity: Entity): void;
}
