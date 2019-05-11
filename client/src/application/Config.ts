import { IConfig } from './interfaces/IConfig';

const config: IConfig = {
    server: {
        dev: true,
        protocol: 'wss',
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
        initialPosition: { x: 200, y: 10, z: 120 },
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
    },
    assets: {
        dev: true,
        protocol: 'https',
        hostname: 'localhost',
        port: 3000,
        dataStore: '/api/asset-store',
        api: '/api/assets'
    }
};

export { config };
