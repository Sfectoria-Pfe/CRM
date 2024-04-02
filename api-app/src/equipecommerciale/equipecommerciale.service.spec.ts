import { Test, TestingModule } from '@nestjs/testing';
import { EquipecommercialeService } from './equipecommerciale.service';

describe('EquipecommercialeService', () => {
  let service: EquipecommercialeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipecommercialeService],
    }).compile();

    service = module.get<EquipecommercialeService>(EquipecommercialeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
