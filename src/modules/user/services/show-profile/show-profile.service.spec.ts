import { Test, TestingModule } from '@nestjs/testing';
import { ShowProfileService } from './show-profile.service';

describe('ShowProfileService', () => {
  let service: ShowProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShowProfileService],
    }).compile();

    service = module.get<ShowProfileService>(ShowProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
