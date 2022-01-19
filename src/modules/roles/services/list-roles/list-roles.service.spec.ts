import { Test, TestingModule } from '@nestjs/testing';
import { ListRolesService } from './list-roles.service';

describe('ListRolesService', () => {
  let service: ListRolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListRolesService],
    }).compile();

    service = module.get<ListRolesService>(ListRolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
