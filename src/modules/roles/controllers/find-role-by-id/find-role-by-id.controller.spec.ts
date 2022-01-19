import { Test, TestingModule } from '@nestjs/testing';
import { FindRoleByIdController } from './find-role-by-id.controller';

describe('FindRoleByIdController', () => {
  let controller: FindRoleByIdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindRoleByIdController],
    }).compile();

    controller = module.get<FindRoleByIdController>(FindRoleByIdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
