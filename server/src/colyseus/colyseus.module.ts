import { Module } from '@nestjs/common';
import { ConfigModule } from 'nestjs-config';
import * as path from 'path';

import { ColyseusService } from './colyseus.service';
import { StateHandler } from './state-handler.service';

@Module({
  imports: [
    ConfigModule.load(path.resolve('./config', '**/!(*.d).{ts,js}')),
  ],
  exports: [ColyseusService],
  providers: [ColyseusService, StateHandler],
})
export class ColyseusModule {}
