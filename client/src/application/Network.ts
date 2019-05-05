import * as Colyseus from 'colyseus.js';

import { IConfigServer } from './Config';
import { createUrl } from './utility/create-url';

type EntityType = "players" | "emitters" | "sounds" | "lights"
type ListenerType = "onChange" | "onAdd" | "onRemove"
type ListenerCallback<T> = (instance: T, key: string | number) => void

export class Network {

    private readonly config: IConfigServer;
    private readonly client: Colyseus.Client;
    private room: Colyseus.Room;

    get url() {
        return createUrl(
            this.config.protocol,
            this.config.address,
            this.config.port
        )
    }

    constructor(config: IConfigServer, options?: any) {
        this.config = config;
        this.client = new Colyseus.Client(this.url, options);
        this.attachClientListeners();
    }

    private attachClientListeners() {
        this.client.onClose.add(() => {
            console.error('connection closed.')
        });

        this.client.onOpen.add(() => {
            console.log(`connection opened: ${this.url}`)
        });

        this.client.onError.add((error: any) => {
            console.error(error)
        });
    }

    public joinRoom() {
        this.room = this.client.join(this.config.room)
    }

    attachRoomListener<T>(type: ListenerType, entity: EntityType, callback: ListenerCallback<T>) {
       this.room.onStateChange.addOnce(() => {
        this.room.state[entity][type] = callback;
      });
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