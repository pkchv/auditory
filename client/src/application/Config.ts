import { Vector3Dto } from './dto/vector3.dto';

interface IConfigServer {
    protocol: string;
    address: string;
    room: string;
    port: number;
}

interface IConfigScene {
    audioEnabled: boolean;
    gravity: Vector3Dto;
    collisionsEnabled: boolean;
}

interface IConfigCamera {
    initialPosition: Vector3Dto;
    applyGravity: boolean;
    ellipsoid: Vector3Dto;
    checkCollisions: boolean;
}

interface IConfig {
    server: IConfigServer;
    scene: IConfigScene;
    camera: IConfigCamera;
}

const config: IConfig = {
    server: {
        protocol: 'ws',
        address: 'localhost',
        room: 'vr-auditory',
        port: 8081
    },
    scene: {
        audioEnabled: true,
        gravity: { x: 0, y: -9.81, z: 0 },
        collisionsEnabled: true,
    },
    camera: {
        initialPosition: { x: 0, y: 0, z: -8 },
        applyGravity: true,
        ellipsoid: { x: 1, y: 1, z: 1 },
        checkCollisions: true
    }
};

export { config, IConfig, IConfigServer, IConfigScene };
