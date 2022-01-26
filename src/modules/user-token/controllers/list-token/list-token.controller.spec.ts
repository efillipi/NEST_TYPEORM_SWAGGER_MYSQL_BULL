import { Test, TestingModule } from '@nestjs/testing';
import { ListTokenController } from './list-token.controller';

describe('ListTokenController', () => {
  let controller: ListTokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListTokenController],
    }).compile();

    controller = module.get<ListTokenController>(ListTokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
