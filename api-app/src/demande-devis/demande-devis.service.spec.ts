import { Test, TestingModule } from '@nestjs/testing';
import { DemandeDevisService } from './demande-devis.service';

describe('DemandeDevisService', () => {
  let service: DemandeDevisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DemandeDevisService],
    }).compile();

    service = module.get<DemandeDevisService>(DemandeDevisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
