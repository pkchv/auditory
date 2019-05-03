import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AssetsService {

  private readonly logger = new Logger(AssetsService.name);

}
