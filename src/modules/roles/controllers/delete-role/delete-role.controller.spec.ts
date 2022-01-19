import { Test, TestingModule } from '@nestjs/testing';
import { DeleteRoleController } from './delete-role.controller';

describe('DeleteRoleController', () => {
  let controller: DeleteRoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteRoleController],
    }).compile();

    controller = module.get<DeleteRoleController>(DeleteRoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
