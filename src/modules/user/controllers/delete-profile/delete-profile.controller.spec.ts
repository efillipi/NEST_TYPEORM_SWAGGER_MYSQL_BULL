import { Test, TestingModule } from '@nestjs/testing';
import { DeleteProfileController } from './delete-profile.controller';

describe('DeleteProfileController', () => {
  let controller: DeleteProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteProfileController],
    }).compile();

    controller = module.get<DeleteProfileController>(DeleteProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
