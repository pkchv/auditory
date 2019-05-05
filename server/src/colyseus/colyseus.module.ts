import { Module } from '@nestjs/common';
import { ConfigModule } from 'nestjs-config';
import * as path from 'path';

import { ColyseusService } from './colyseus.service';

@Module({
  imports: [
    ConfigModule.load(path.resolve('./config', '**/!(*.d).{ts,js}')),
  ],
  providers: [ColyseusService],
})
export class ColyseusModule {}
