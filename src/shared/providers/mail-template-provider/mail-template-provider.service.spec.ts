import { Test, TestingModule } from '@nestjs/testing';
import { MailTemplateProviderService } from './mail-template-provider.service';

describe('MailTemplateProviderService', () => {
  let service: MailTemplateProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailTemplateProviderService],
    }).compile();

    service = module.get<MailTemplateProviderService>(
      MailTemplateProviderService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
