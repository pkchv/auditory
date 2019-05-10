import { Injectable, HttpException } from '@nestjs/common';
import * as fs from 'mz/fs';
import * as path from 'path';
import { InjectConfig, ConfigService } from 'nestjs-config';
import { AssetDto } from './dto/asset.dto';

@Injectable()
export class AssetsService {

  private readonly resourceTypes: string[];

  constructor(
    @InjectConfig() private readonly config: ConfigService,
  ) {
    this.resourceTypes = this.config.get('assets.resourceTypes', []);
  }

  private getPath(resourceType: string) {
    return path.join(__dirname, this.config.get('assets.path'), resourceType);
  }

  private list(dir: string): Promise<string[]> {
    return fs.readdir(dir);
  }

  async listAssets(resourceType: string) {

    if (!this.resourceTypes.includes(resourceType)) {
      return Promise.reject(new HttpException('Resource type does not exists', 404));
    }

    const resourceDir = this.getPath(resourceType);
    const files = await this.list(resourceDir);

    return files
      .sort()
      .map((filename: string, id: number) => new AssetDto(id, filename));
  }

}
