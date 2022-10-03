import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { appConfig } from '../config/app.config';
import { PrismaModule } from '../prisma/prisma.module';
import { HealthController } from './health.controller';
import { PrismaHealthIndicator } from './prisma-health-indicator.service';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(appConfig), TerminusModule, PrismaModule],
      controllers: [HealthController],
      providers: [PrismaHealthIndicator],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
