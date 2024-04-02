import { Test, TestingModule } from '@nestjs/testing';
import { CategorieclientsService } from './categorieclients.service';

describe('CategorieclientsService', () => {
  let service: CategorieclientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategorieclientsService],
    }).compile();

    service = module.get<CategorieclientsService>(CategorieclientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
