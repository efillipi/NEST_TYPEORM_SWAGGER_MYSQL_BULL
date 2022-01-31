import { Test, TestingModule } from '@nestjs/testing';
import { SendMailConsumerService } from './send-mail-consumer.service';

describe('SendMailConsumerService', () => {
  let service: SendMailConsumerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SendMailConsumerService],
    }).compile();

    service = module.get<SendMailConsumerService>(SendMailConsumerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
