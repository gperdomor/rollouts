import { Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app/app.module';
import { appConfig } from './config/app.config';
import { configure } from './configure';
import { SERVICE_NAME } from './constants';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), { bufferLogs: true });

  const config: ConfigType<typeof appConfig> = app.get(appConfig.KEY);

  await configure(app);

  await app.listen(config.port, config.host);
  Logger.log(`🚀 Application ${SERVICE_NAME} is running on: ${await app.getUrl()}`, 'Bootstrap');
}

bootstrap();
