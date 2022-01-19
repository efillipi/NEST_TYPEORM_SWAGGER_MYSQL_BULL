import { Test, TestingModule } from '@nestjs/testing';
import { UpdateRoleController } from './update-role.controller';

describe('UpdateRoleController', () => {
  let controller: UpdateRoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateRoleController],
    }).compile();

    controller = module.get<UpdateRoleController>(UpdateRoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
