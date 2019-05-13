import * as Colyseus from 'colyseus.js';

import { IConfigServer } from '../interface/IConfigServer';
import { createUrl } from '../utility/create-url';

export type EntityType = "players" | "emitters" | "lights"
export type ListenerType = "onChange" | "onAdd" | "onRemove"
export type ListenerCallback<Id, Entity> = (instance: Entity, id: Id) => void

export class Network {

    private readonly config: IConfigServer;
    private readonly client: Colyseus.Client;
    private room: Colyseus.Room;

    get url() {
        const { dev, protocol, hostname, port } = this.config;
        return createUrl(
            protocol,
            dev ? window.location.hostname : hostname,
            port
        )
    }

    constructor(config: IConfigServer, options?: any) {
        this.config = config;
        this.client = new Colyseus.Client(this.url, options);
        this.attachClientListeners();
    }

    private attachClientListeners() {
        this.client.onClose.add(() => {
            this.room = this.client.join(this.config.room);
            console.error('connection closed.')
        });

        this.client.onOpen.add(() => {
            console.log(`connection opened: ${this.url}`)
        });

        this.client.onError.add((error: any) => {
            this.room = this.client.join(this.config.room);
            console.error(error)
        });
    }

    connect() {
        this.room = this.client.join(this.config.room)
    }

    send(payload: object) {
        if (this.room.hasJoined) {
            return this.room.send(payload);
        }

        this.room.onJoin.addOnce(() => {
            this.room.send(payload);
        });
    }

    attachRoomListener<Id, Entity>(type: ListenerType, entity: EntityType, callback: ListenerCallback<Id, Entity>) {
        this.room.onJoin.addOnce(() => {
            this.room.state[entity][type] = callback;
        })
    }

    getClientRef(): Colyseus.Client {
        return this.client;
    }

    onMessage(callback: Function) {
        this.room.onMessage.add((message: any) => {
            callback(message);
        });
    }

    onStateChange(callback: Function) {
        this.room.onStateChange.add((state: any) => {
            callback(state);
        })
    }

}