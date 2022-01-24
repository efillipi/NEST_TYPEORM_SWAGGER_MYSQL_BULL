import { Test, TestingModule } from '@nestjs/testing';
import { UpdateAvatarController } from './update-avatar.controller';

describe('UpdateAvatarController', () => {
  let controller: UpdateAvatarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateAvatarController],
    }).compile();

    controller = module.get<UpdateAvatarController>(UpdateAvatarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
