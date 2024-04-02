import { Test, TestingModule } from '@nestjs/testing';
import { EquipecommercialeController } from './equipecommerciale.controller';
import { EquipecommercialeService } from './equipecommerciale.service';

describe('EquipecommercialeController', () => {
  let controller: EquipecommercialeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipecommercialeController],
      providers: [EquipecommercialeService],
    }).compile();

    controller = module.get<EquipecommercialeController>(EquipecommercialeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
