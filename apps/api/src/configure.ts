import helmet from '@fastify/helmet';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { oasConfig } from './config/oas.config';
import { corsOptions, helmetOptions, validationPipeOptions } from './constants';
import { PrismaExceptionFilter } from './prisma/prisma-exception.filter';
import { PrismaService } from './prisma/prisma.service';

const configureOAS = async (app: NestFastifyApplication) => {
  const oasConf: ConfigType<typeof oasConfig> = app.get(oasConfig.KEY);

  if (oasConf.enabled) {
    const config = new DocumentBuilder()
      .setTitle('Rollouts')
      .setDescription('Rollouts API')
      .setContact('Gustavo Perdomo', undefined, 'gperdomor@gmail.com')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(oasConf.path, app, document);

    Logger.log(`📖 Open API Specification is enabled under /${oasConf.path} path`, 'Configure');
  } else {
    Logger.log(`📖 Open API Specification is disabled`, 'Configure');
  }
};

export const configure = async (app: NestFastifyApplication) => {
  app.enableCors(corsOptions);

  await app.register(helmet, helmetOptions);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
  app.useGlobalFilters(new PrismaExceptionFilter());

  await configureOAS(app);

  app.enableShutdownHooks();

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
};
