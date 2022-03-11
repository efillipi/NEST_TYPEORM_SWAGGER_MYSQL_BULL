import { Test, TestingModule } from '@nestjs/testing';
import { MailExportsService } from './mail-exports.service';

describe('MailExportsService', () => {
  let service: MailExportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailExportsService],
    }).compile();

    service = module.get<MailExportsService>(MailExportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
