import { Test, TestingModule } from '@nestjs/testing';
import { ListUserTokenService } from './list-user-token.service';

describe('ListUserTokenService', () => {
  let service: ListUserTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListUserTokenService],
    }).compile();

    service = module.get<ListUserTokenService>(ListUserTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
