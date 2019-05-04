
import * as Colyseus from "colyseus.js";
import { IConfigServer } from "./Config";
import { createUrl } from './utility/create-url';

export class Network {

    url: string;
    config: IConfigServer;
    room: string;
    client: Colyseus.Client;
    options: any;

    constructor(config: IConfigServer, options?: any) {
        this.config = config;
        const { protocol, address, port } = config;
        const url = createUrl(protocol, address, port);
        this.url = url;
        this.room = config.room;
        this.client = new Colyseus.Client(url, options);
        this.attachEvents();
        this.initialize();
    }

    private initialize() {
        console.log('Initializing network client');
        this.client.join(this.room);
    }

    private attachEvents() {
        this.client.onClose.add(() => console.log('connection closed.'));
        this.client.onOpen.add(() => console.log(`connection opened: ${this.url}`))
        this.client.onError.add((error: any) => console.error(error));
    }

    getClientRef(): Colyseus.Client {
        return this.client;
    }

}