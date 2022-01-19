import { Test, TestingModule } from '@nestjs/testing';
import { CreateRoleController } from './create-role.controller';

describe('CreateRoleController', () => {
  let controller: CreateRoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateRoleController],
    }).compile();

    controller = module.get<CreateRoleController>(CreateRoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
