import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorFunction,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { appConfig } from '../config/app.config';
import { PrismaHealthIndicator } from './prisma-health-indicator.service';

@Controller('healthz')
@ApiTags('Health Checks')
export class HealthController {
  indicators: HealthIndicatorFunction[];

  constructor(
    @Inject(appConfig.KEY)
    private config: ConfigType<typeof appConfig>,
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
    private db: PrismaHealthIndicator
  ) {
    this.indicators = [() => this.db.isHealthy('db')];

    if (this.config.memory.heapLimit > 0) {
      this.indicators.push(() => this.memory.checkHeap('memory_heap', this.config.memory.heapLimit * 1024 * 1024));
    }

    if (this.config.memory.rssLimit > 0) {
      this.indicators.push(() => this.memory.checkRSS('memory_rss', this.config.memory.rssLimit * 1024 * 1024));
    }
  }

  @Get('liveness')
  @ApiOkResponse({ description: 'The application is alive' })
  async liveness(): Promise<{ status: 'ok' }> {
    return { status: 'ok' };
  }

  @Get('readiness')
  @HealthCheck()
  async readiness(): Promise<HealthCheckResult | undefined> {
    return this.health.check(this.indicators);
  }
}
