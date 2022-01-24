import { Test, TestingModule } from '@nestjs/testing';
import { UpdateAvatarService } from './update-avatar.service';

describe('UpdateAvatarService', () => {
  let service: UpdateAvatarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateAvatarService],
    }).compile();

    service = module.get<UpdateAvatarService>(UpdateAvatarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
