import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';

import { ColyseusModule } from './colyseus/colyseus.module';

ConfigService.rootPath = path.resolve(__dirname, '.');

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    ColyseusModule,
  ],
})
export class AppModule {}
