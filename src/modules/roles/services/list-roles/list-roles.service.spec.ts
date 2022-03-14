import { Test, TestingModule } from '@nestjs/testing';
import { FakeRoleRepository } from '../../repositories/Fakes/FakeRoleRepository';
import { RoleRepositoryService } from '../../repositories/RoleRepository';
import { ListRolesService } from './list-roles.service';

describe('ListRolesService', () => {
  let service: ListRolesService;
  const repository: FakeRoleRepository = new FakeRoleRepository();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListRolesService,
        {
          provide: RoleRepositoryService,
          useValue: {
            find: () => repository.find(),
          },
        },
      ],
    }).compile();

    service = module.get<ListRolesService>(ListRolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Show Role', () => {
    it('Must be able to list the functions', async () => {
      // Arrange
      await repository.create({
        name: 'teste',
        description: 'teste',
      });

      const find = jest.spyOn(repository, 'find');

      // Act
      const result = await service.execute();

      // Assert
      expect(result.length).toBe(1);
      expect(find).toHaveBeenCalledTimes(1);
    });
  });
});
