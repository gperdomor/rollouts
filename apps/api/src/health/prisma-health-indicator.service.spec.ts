import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaHealthIndicator } from './prisma-health-indicator.service';

describe('PrismaHealthIndicator', () => {
  let service: PrismaHealthIndicator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [PrismaHealthIndicator],
    }).compile();

    service = module.get<PrismaHealthIndicator>(PrismaHealthIndicator);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
