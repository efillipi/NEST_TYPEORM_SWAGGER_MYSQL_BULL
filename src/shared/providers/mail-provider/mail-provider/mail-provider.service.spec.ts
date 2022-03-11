import { Test, TestingModule } from '@nestjs/testing';
import { SendgridService } from './mail-provider.service';

describe('SendgridService', () => {
  let service: SendgridService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SendgridService],
    }).compile();

    service = module.get<SendgridService>(SendgridService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
