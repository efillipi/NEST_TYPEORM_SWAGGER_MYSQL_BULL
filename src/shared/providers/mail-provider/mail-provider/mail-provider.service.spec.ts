import { Test, TestingModule } from '@nestjs/testing';
import { MailProviderService } from './mail-provider.service';

describe('MailProviderService', () => {
  let service: MailProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailProviderService],
    }).compile();

    service = module.get<MailProviderService>(MailProviderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
