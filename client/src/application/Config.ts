import { Vector3Dto } from './dto/vector3.dto';

interface IConfigServer {
    dev: boolean;
    protocol: string;
    hostname: string;
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
    rayLength: number;
    createPlatforms: boolean;
    platforms: {
        frequency: number;
        sizeReduction: number;
        modX: number;
        modZ: number;
    }
}

interface IConfig {
    server: IConfigServer;
    scene: IConfigScene;
    camera: IConfigCamera;
    sandbox: IConfigSandbox;
}

const config: IConfig = {
    server: {
        dev: true,
        protocol: 'ws',
        hostname: 'localhost',
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
        ellipsoidOffset: { x: 0, y: 10, z: 0 },
        checkCollisions: true,
        speed: 3,
        angularSensibility: 8000,
        gamepadAngularSensibility: 2500,
    },
    sandbox: {
        size: 2048,
        rayLength: 20000,
        createPlatforms: true,
        platforms: {
            frequency: 16,
            sizeReduction: 2,
            modX: 4,
            modZ: 5,
        }
    }
};

export { config, IConfig, IConfigServer, IConfigScene, IConfigCamera, IConfigSandbox };
