import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as CookieParser from 'cookie-parser';

async function start() {
  const logger = new Logger('NestApplication');

  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get('PORT');

  app.use(CookieParser());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api/');
  app.enableCors();

  await app.listen(port, () =>
    logger.log(`Nest application successfully started on port ${port}.`),
  );
}

start();
