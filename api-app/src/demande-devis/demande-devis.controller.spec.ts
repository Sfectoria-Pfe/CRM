import { Test, TestingModule } from '@nestjs/testing';
import { DemandeDevisController } from './demande-devis.controller';
import { DemandeDevisService } from './demande-devis.service';

describe('DemandeDevisController', () => {
  let controller: DemandeDevisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DemandeDevisController],
      providers: [DemandeDevisService],
    }).compile();

    controller = module.get<DemandeDevisController>(DemandeDevisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
