import { Test, TestingModule } from '@nestjs/testing';
import { DeleteProfileService } from './delete-profile.service';

describe('DeleteProfileService', () => {
  let service: DeleteProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteProfileService],
    }).compile();

    service = module.get<DeleteProfileService>(DeleteProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
