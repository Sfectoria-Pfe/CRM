import { Test, TestingModule } from '@nestjs/testing';
import { StageClientService } from './stage_client.service';

describe('StageClientService', () => {
  let service: StageClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StageClientService],
    }).compile();

    service = module.get<StageClientService>(StageClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
