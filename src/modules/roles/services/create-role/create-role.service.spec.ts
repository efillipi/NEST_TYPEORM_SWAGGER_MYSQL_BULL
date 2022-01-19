import { Test, TestingModule } from '@nestjs/testing';
import { CreateRoleService } from './create-role.service';

describe('CreateRoleService', () => {
  let service: CreateRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateRoleService],
    }).compile();

    service = module.get<CreateRoleService>(CreateRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
