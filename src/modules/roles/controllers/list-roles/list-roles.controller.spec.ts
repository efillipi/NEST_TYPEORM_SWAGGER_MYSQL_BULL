import { Test, TestingModule } from '@nestjs/testing';
import { ListRolesController } from './list-roles.controller';

describe('ListRolesController', () => {
  let controller: ListRolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListRolesController],
    }).compile();

    controller = module.get<ListRolesController>(ListRolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
