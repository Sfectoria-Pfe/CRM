import { Test, TestingModule } from '@nestjs/testing';
import { ServiceDetailsController } from './service-details.controller';
import { ServiceDetailsService } from './service-details.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('ServiceDetailsController', () => {
  let controller: ServiceDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceDetailsController],
      providers: [ServiceDetailsService,PrismaService],
    }).compile();

    controller = module.get<ServiceDetailsController>(ServiceDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
