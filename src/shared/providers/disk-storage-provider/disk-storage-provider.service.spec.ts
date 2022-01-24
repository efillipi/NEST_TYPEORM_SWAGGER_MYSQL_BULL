import { Test, TestingModule } from '@nestjs/testing';
import { DiskStorageProviderService } from './disk-storage-provider.service';

describe('DiskStorageProviderService', () => {
  let service: DiskStorageProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiskStorageProviderService],
    }).compile();

    service = module.get<DiskStorageProviderService>(
      DiskStorageProviderService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
