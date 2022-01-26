import { Test, TestingModule } from '@nestjs/testing';
import { FindUserTokenByIdService } from './find-user-token-by-id.service';

describe('FindUserTokenByIdService', () => {
  let service: FindUserTokenByIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindUserTokenByIdService],
    }).compile();

    service = module.get<FindUserTokenByIdService>(FindUserTokenByIdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
