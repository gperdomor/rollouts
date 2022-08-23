import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

type DatabaseConfig = {
  url: string;
};

export const databaseConfig = registerAs<DatabaseConfig>('database', () => ({
  url: process.env.DATABASE_URL,
}));

export const databaseConfigSchema = Joi.object({
  DATABASE_URL: Joi.string()
    .uri({ scheme: ['postgres', 'postgresql'] })
    .required(),
});
