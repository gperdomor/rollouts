import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

type AppConfig = {
  host: string;
  port: number;
};

export const appConfig = registerAs<AppConfig>('app', () => ({
  host: process.env.HOST,
  port: Number(process.env.PORT),
}));

export const appConfigSchema = Joi.object({
  HOST: Joi.string().hostname().default('0.0.0.0'),
  PORT: Joi.number().default(3000),
});
