import { Test, TestingModule } from '@nestjs/testing';
import { HashProviderService } from './hash-provider.service';

describe('HashProviderService', () => {
  let service: HashProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HashProviderService],
    }).compile();

    service = module.get<HashProviderService>(HashProviderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
