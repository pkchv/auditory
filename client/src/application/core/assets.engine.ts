import axios from 'axios';
import { AbstractAssetTask, AssetsManager, BinaryFileAssetTask, Scene, Sound } from 'babylonjs';

import { AssetDto } from '../dto/asset.dto';
import { IConfigAssets } from '../interface/IConfigAssets';
import { createUrl } from '../utility/create-url';

type TResourceType = 'sound' | 'mesh' | 'color'
export class Assets extends AssetsManager {

    readonly sounds: Map<number, Sound>;

    constructor(
        private readonly scene: Scene,
        private readonly config: IConfigAssets,
    ) {
        super(scene);
        this.sounds = new Map();
    }

    async fetch() {
        await this.fetchSounds();
    }

    async fetchSounds(): Promise<void> {
        const resourceType = 'sound';
        const resourceList = await this.fetchResourceList(resourceType);

        console.log(resourceList);

        resourceList.map(({ id, url, filename }) => {
            const task = this.addBinaryFileTask(filename, url);
            task.onSuccess = (task: BinaryFileAssetTask) => {
                const sound = new Sound(filename, task.data, this.scene, () => {
                    this.sounds.set(id, sound);
                });
            }
        });
    }

    setOnFinish(callback: (tasks: AbstractAssetTask[]) => void): void {
        this.onFinish = callback;
    }

    fetchResourceList(type: TResourceType): Promise<AssetDto[]> {
        const { dev, protocol, hostname, port, api, dataStore } = this.config;
        const targetHostname = dev ? window.location.hostname : hostname;
        const url = createUrl(
            protocol,
            targetHostname,
            port,
            `${api}/${type}`
        );

        console.log(url);

        return axios.get(url).then(({ data }) => {
            return data.map((asset: AssetDto) => {

                asset.url = createUrl(
                    protocol,
                    targetHostname,
                    port,
                    `${dataStore}/${type}/${asset.filename}`
                );

                return asset;
            });
        })
    }

}
