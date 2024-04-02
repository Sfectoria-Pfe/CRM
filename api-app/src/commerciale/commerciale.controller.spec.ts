import { Test, TestingModule } from '@nestjs/testing';
import { CommercialeController } from './commerciale.controller';
import { CommercialeService } from './commerciale.service';

describe('CommercialeController', () => {
  let controller: CommercialeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommercialeController],
      providers: [CommercialeService],
    }).compile();

    controller = module.get<CommercialeController>(CommercialeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
