import { Test, TestingModule } from '@nestjs/testing';
import { VentesController } from './ventes.controller';
import { VentesService } from './ventes.service';

describe('VentesController', () => {
  let controller: VentesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VentesController],
      providers: [VentesService],
    }).compile();

    controller = module.get<VentesController>(VentesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
