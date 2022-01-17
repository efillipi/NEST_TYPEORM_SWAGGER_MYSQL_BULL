import { Test, TestingModule } from '@nestjs/testing';
import { FindUserByIdController } from './find-user-by-id.controller';

describe('FindUserByIdController', () => {
  let controller: FindUserByIdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindUserByIdController],
    }).compile();

    controller = module.get<FindUserByIdController>(FindUserByIdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
