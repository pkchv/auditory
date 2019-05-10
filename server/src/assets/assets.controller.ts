import { Controller, Get, Param, Logger } from '@nestjs/common';

import { AssetsService } from './assets.service';
import { AssetDto } from './dto/asset.dto';

@Controller('assets')
export class AssetsController {

    private readonly logger = new Logger(AssetsController.name);

    constructor(
        private readonly assetsService: AssetsService,
    ) {}

    @Get(':type')
    list(@Param('type') resourceType: string): Promise<AssetDto[]> {
        this.logger.log(`Resource type list fetch -> ${resourceType}`);
        return this.assetsService.listAssets(resourceType);
    }

}
