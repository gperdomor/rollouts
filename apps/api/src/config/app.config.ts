import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

type AppConfig = {
  host: string;
  port: number;
  memory: {
    heapLimit: number;
    rssLimit: number;
  };
};

export const appConfig = registerAs<AppConfig>('app', () => ({
  host: process.env.HOST,
  port: Number(process.env.PORT),
  memory: {
    heapLimit: Number(process.env.MEMORY_RSS_LIMIT),
    rssLimit: Number(process.env.MEMORY_HEAP_LIMIT),
  },
}));

export const appConfigSchema = Joi.object({
  HOST: Joi.string().hostname().default('0.0.0.0'),
  PORT: Joi.number().port().default(3000),
  MEMORY_RSS_LIMIT: Joi.number().positive().default(0),
  MEMORY_HEAP_LIMIT: Joi.number().positive().default(0),
});
