import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { appConfig } from '../config/app.config';
import { PrismaModule } from '../prisma/prisma.module';
import { HealthController } from './health.controller';
import { PrismaHealthIndicator } from './prisma-health-indicator.service';

@Module({
  imports: [ConfigModule.forFeature(appConfig), TerminusModule, PrismaModule],
  controllers: [HealthController],
  providers: [PrismaHealthIndicator],
})
export class HealthModule {}
