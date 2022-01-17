import { Test, TestingModule } from '@nestjs/testing';
import { ListUsersController } from './list-users.controller';

describe('ListUsersController', () => {
  let controller: ListUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListUsersController],
    }).compile();

    controller = module.get<ListUsersController>(ListUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
