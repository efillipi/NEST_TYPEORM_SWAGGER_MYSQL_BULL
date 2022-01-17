import { Test, TestingModule } from '@nestjs/testing';
import { FindUserByidService } from './find-user-byid.service';

describe('FindUserByidService', () => {
  let service: FindUserByidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindUserByidService],
    }).compile();

    service = module.get<FindUserByidService>(FindUserByidService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
