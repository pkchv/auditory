
export interface IConfigSandbox {
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
