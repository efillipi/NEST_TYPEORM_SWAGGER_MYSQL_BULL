import { Test, TestingModule } from '@nestjs/testing';
import { SendMailProducerService } from './send-mail-producer.service';

describe('SendMailProducerService', () => {
  let service: SendMailProducerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SendMailProducerService],
    }).compile();

    service = module.get<SendMailProducerService>(SendMailProducerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
