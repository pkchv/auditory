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
    ellipsoidOffset: Vector3Dto;
    checkCollisions: boolean;
    speed: number;
    angularSensibility: number;
    gamepadAngularSensibility: number;
}

interface IConfigSandbox {
    size: number;
}

interface IConfig {
    server: IConfigServer;
    scene: IConfigScene;
    camera: IConfigCamera;
    sandbox: IConfigSandbox;
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
        initialPosition: { x: 20, y: 3, z: 20 },
        applyGravity: true,
        ellipsoid: { x: 1, y: 1, z: 1 },
        ellipsoidOffset: { x: 0, y: -50, z: 0 },
        checkCollisions: true,
        speed: 3,
        angularSensibility: 2700,
        gamepadAngularSensibility: 2500,
    },
    sandbox: {
        size: 2048,
    }
};

export { config, IConfig, IConfigServer, IConfigScene };
