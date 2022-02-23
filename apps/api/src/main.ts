/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { AppController } from './app/app.controller';
import { ExpressPeerServer }  from 'peer'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors({origin:'*'});
  app.use('/peerjs', ExpressPeerServer(app.getHttpServer()))
  const port = process.env.PORT || 3333;
  const appCont = app.get(AppController);
  await appCont.init();
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
