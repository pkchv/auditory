
interface IConfigServer {
    protocol: string;
    address: string;
    room: string;
    port: number;
}

interface IConfig {
    server: IConfigServer
}

const config: IConfig = {
    server: {
        protocol: 'ws',
        address: 'localhost',
        room: 'vr-auditory',
        port: 8081
    }
};

export { config, IConfig, IConfigServer };
