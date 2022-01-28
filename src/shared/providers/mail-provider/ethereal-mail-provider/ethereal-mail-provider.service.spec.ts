import { Test, TestingModule } from '@nestjs/testing';
import { EtherealMailProviderService } from './ethereal-mail-provider.service';

describe('EtherealMailProviderService', () => {
  let service: EtherealMailProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EtherealMailProviderService],
    }).compile();

    service = module.get<EtherealMailProviderService>(
      EtherealMailProviderService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
