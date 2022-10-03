import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PrometheusModule } from '../prometheus/prometheus.module';
import { MetricsController } from './metrics.controller';

@Module({
  imports: [PrismaModule, PrometheusModule],
  controllers: [MetricsController],
})
export class MetricsModule {}
