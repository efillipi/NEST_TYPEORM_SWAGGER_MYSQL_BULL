import { Test, TestingModule } from '@nestjs/testing';
import { FakeRoleRepository } from '../../repositories/Fakes/FakeRoleRepository';
import { RoleRepositoryService } from '../../repositories/RoleRepository';
import { FindRoleByIdService } from './find-role-by-id.service';

describe('FindRoleByIdService', () => {
  let service: FindRoleByIdService;
  const repository: FakeRoleRepository = new FakeRoleRepository();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindRoleByIdService,
        {
          provide: RoleRepositoryService,
          useValue: {
            findSomething: (payload: any) => repository.findSomething(payload),
          },
        },
      ],
    }).compile();

    service = module.get<FindRoleByIdService>(FindRoleByIdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Show Role', () => {
    it('Must be able to show a role', async () => {
      // Arrange
      const role = await repository.create({
        name: 'teste',
        description: 'teste',
      });

      const findSomething = jest.spyOn(repository, 'findSomething');

      // Act
      const result = await service.execute(role.id);

      // Assert
      expect(result).toHaveProperty('id');
      expect(result.name).toBe('teste');
      expect(result.description).toBe('teste');
      expect(findSomething).toHaveBeenCalledTimes(1);
    });

    it('must not be able to show a role', async () => {
      // Assert
      await expect(service.execute(2)).rejects.toThrowError();
    });
  });
});
