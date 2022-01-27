import { Test, TestingModule } from '@nestjs/testing';
import { FindUserTokenByIdController } from './find-user-token-by-id.controller';

describe('FindUserTokenByIdController', () => {
  let controller: FindUserTokenByIdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindUserTokenByIdController],
    }).compile();

    controller = module.get<FindUserTokenByIdController>(
      FindUserTokenByIdController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
