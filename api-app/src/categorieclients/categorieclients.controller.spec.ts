import { Test, TestingModule } from '@nestjs/testing';
import { CategorieclientsController } from './categorieclients.controller';
import { CategorieclientsService } from './categorieclients.service';

describe('CategorieclientsController', () => {
  let controller: CategorieclientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategorieclientsController],
      providers: [CategorieclientsService],
    }).compile();

    controller = module.get<CategorieclientsController>(CategorieclientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
