import { Test, TestingModule } from '@nestjs/testing';
import { StageClientController } from './stage_client.controller';
import { StageClientService } from './stage_client.service';

describe('StageClientController', () => {
  let controller: StageClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StageClientController],
      providers: [StageClientService],
    }).compile();

    controller = module.get<StageClientController>(StageClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
