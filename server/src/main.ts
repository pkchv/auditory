import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import express = require('express');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.enableShutdownHooks();
  app.use('/assets', express.static(join(__dirname, 'asset-store')));
  await app.listen(process.env.PORT || 8080);
}

bootstrap();
