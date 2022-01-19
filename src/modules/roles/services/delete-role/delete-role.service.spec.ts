import { Test, TestingModule } from '@nestjs/testing';
import { DeleteRoleService } from './delete-role.service';

describe('DeleteRoleService', () => {
  let service: DeleteRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteRoleService],
    }).compile();

    service = module.get<DeleteRoleService>(DeleteRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
