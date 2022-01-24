import { Test, TestingModule } from '@nestjs/testing';
import { ShowProfileController } from './show-profile.controller';

describe('ShowProfileController', () => {
  let controller: ShowProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShowProfileController],
    }).compile();

    controller = module.get<ShowProfileController>(ShowProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
