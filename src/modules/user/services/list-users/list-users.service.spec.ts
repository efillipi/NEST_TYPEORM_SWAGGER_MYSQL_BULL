import { Test, TestingModule } from '@nestjs/testing';
import { ListUsersService } from './list-users.service';

describe('ListUsersService', () => {
  let service: ListUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListUsersService],
    }).compile();

    service = module.get<ListUsersService>(ListUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
