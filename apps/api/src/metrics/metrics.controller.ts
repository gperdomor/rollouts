import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SERVICE_NAME } from '../constants';
import { PrismaService } from '../prisma/prisma.service';
import { PrometheusService } from '../prometheus/prometheus.service';

@ApiTags('Health Checks')
@Controller('metrics')
export class MetricsController {
  constructor(private readonly prometheus: PrometheusService, private readonly prisma: PrismaService) {}

  @Get()
  @ApiOkResponse({ description: 'Returns application metrics' })
  public async metrics(): Promise<string> {
    const prismaMetrics = await this.prisma.$metrics.prometheus({
      globalLabels: { app: SERVICE_NAME },
    });
    const appMetrics = await this.prometheus.metrics();

    return prismaMetrics + appMetrics;
  }
}
