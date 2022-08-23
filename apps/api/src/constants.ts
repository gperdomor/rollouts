import { FastifyHelmetOptions } from '@fastify/helmet';
import { ValidationPipeOptions } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const SERVICE_NAME = 'dev.gperdomor.rollouts.api';

export const corsOptions: CorsOptions = {};

export const helmetOptions: FastifyHelmetOptions = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: [`'self'`],
      styleSrc: [`'self'`, `'unsafe-inline'`],
      imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
      scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
    },
  },
};

export const validationPipeOptions: ValidationPipeOptions = {
  whitelist: true,
  transform: true,
  forbidNonWhitelisted: true,
  stopAtFirstError: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
};
