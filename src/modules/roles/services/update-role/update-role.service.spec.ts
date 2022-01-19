import { Test, TestingModule } from '@nestjs/testing';
import { UpdateRoleService } from './update-role.service';

describe('UpdateRoleService', () => {
  let service: UpdateRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateRoleService],
    }).compile();

    service = module.get<UpdateRoleService>(UpdateRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
