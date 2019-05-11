import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { httpsOptions } from './config/https-options';
import express = require('express');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  app.enableCors();
  app.enableShutdownHooks();
  app.use('/asset-store', express.static(join(__dirname, 'asset-store')));
  await app.listen(process.env.PORT || 8080);
}

bootstrap();
