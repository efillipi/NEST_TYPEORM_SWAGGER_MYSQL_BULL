import { Test, TestingModule } from '@nestjs/testing';
import { UpdateProfileService } from './update-profile.service';

describe('UpdateProfileService', () => {
  let service: UpdateProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateProfileService],
    }).compile();

    service = module.get<UpdateProfileService>(UpdateProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
