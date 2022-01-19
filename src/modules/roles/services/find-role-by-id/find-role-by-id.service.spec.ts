import { Test, TestingModule } from '@nestjs/testing';
import { FindRoleByIdService } from './find-role-by-id.service';

describe('FindRoleByIdService', () => {
  let service: FindRoleByIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindRoleByIdService],
    }).compile();

    service = module.get<FindRoleByIdService>(FindRoleByIdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
