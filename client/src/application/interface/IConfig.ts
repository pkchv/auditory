import { IConfigServer } from './IConfigServer';
import { IConfigScene } from './IConfigScene';
import { IConfigCamera } from './IConfigCamera';
import { IConfigAssets } from './IConfigAssets';
import { IConfigSandbox } from './IConfigSandbox';

export interface IConfig {
    server: IConfigServer;
    scene: IConfigScene;
    camera: IConfigCamera;
    sandbox: IConfigSandbox;
    assets: IConfigAssets;
}
