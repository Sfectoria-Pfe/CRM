import { Test, TestingModule } from '@nestjs/testing';
import { CommercialeService } from './commerciale.service';

describe('CommercialeService', () => {
  let service: CommercialeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommercialeService],
    }).compile();

    service = module.get<CommercialeService>(CommercialeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
