import { Logger, Module, OnApplicationShutdown } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { appConfig, appConfigSchema } from '../config/app.config';
import { databaseConfig, databaseConfigSchema } from '../config/database.config';
import { oasConfig, oasConfigSchema } from '../config/oas.config';
import { HealthModule } from '../health/health.module';
import { MetricsModule } from '../metrics/metrics.module';
import { PrismaModule } from '../prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      expandVariables: true,
      load: [appConfig, oasConfig, databaseConfig],
      validationSchema: Joi.object().concat(appConfigSchema).concat(oasConfigSchema).concat(databaseConfigSchema),
    }),
    HealthModule,
    PrismaModule,
    MetricsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnApplicationShutdown {
  private readonly logger = new Logger(AppModule.name);

  onApplicationShutdown(signal: string) {
    this.logger.log(`🛑 ${signal} received, exiting now...`);
  }
}
