import { Test, TestingModule } from '@nestjs/testing';
import { FakeRoleRepository } from '../../repositories/Fakes/FakeRoleRepository';
import { RoleRepositoryService } from '../../repositories/RoleRepository';
import { DeleteRoleService } from './delete-role.service';

describe('DeleteRoleService', () => {
  let service: DeleteRoleService;
  const repository: FakeRoleRepository = new FakeRoleRepository();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteRoleService,
        {
          provide: RoleRepositoryService,
          useValue: {
            findSomething: (payload: any) => repository.findSomething(payload),
            delete: (payload: any) => repository.delete(payload),
          },
        },
      ],
    }).compile();

    service = module.get<DeleteRoleService>(DeleteRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('delete Role', () => {
    it('must be able to delete a role', async () => {
      // Arrange
      const role = await repository.create({
        name: 'teste',
        description: 'teste',
      });

      const findSomething = jest.spyOn(repository, 'findSomething');
      const deleteRole = jest.spyOn(repository, 'delete');

      // Act
      await service.execute(role.id);

      // Assert
      expect(findSomething).toHaveBeenCalledTimes(1);
      expect(deleteRole).toHaveBeenCalledTimes(1);
    });

    it('should not be able to delete a role', async () => {
      // Assert
      await expect(service.execute(99)).rejects.toThrowError();
    });
  });
});
