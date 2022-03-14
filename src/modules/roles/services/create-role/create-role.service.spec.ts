import { Test, TestingModule } from '@nestjs/testing';
import ICreateRoleDTO from '../../dtos/ICreateRoleDTO';
import { FakeRoleRepository } from '../../repositories/Fakes/FakeRoleRepository';
import { RoleRepositoryService } from '../../repositories/RoleRepository';
import { CreateRoleService } from './create-role.service';

describe('CreateRoleService', () => {
  let service: CreateRoleService;
  const repository: FakeRoleRepository = new FakeRoleRepository();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateRoleService,
        {
          provide: RoleRepositoryService,
          useValue: {
            findSomething: (payload: any) => repository.findSomething(payload),
            create: (payload: any) => repository.create(payload),
          },
        },
      ],
    }).compile();

    service = module.get<CreateRoleService>(CreateRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create Role', () => {
    it('should Login a new role item successfully', async () => {
      // Arrange
      const body: ICreateRoleDTO = {
        name: 'teste',
        description: 'teste',
      };

      const findSomething = jest.spyOn(repository, 'findSomething');
      const create = jest.spyOn(repository, 'create');

      // Act
      const result = await service.execute(body);

      // Assert
      expect(result).toHaveProperty('id');
      expect(result.name).toBe('teste');
      expect(result.description).toBe('teste');
      expect(findSomething).toHaveBeenCalledTimes(1);
      expect(create).toHaveBeenCalledTimes(1);
    });

    it('should not be able to create a new role with the same name', async () => {
      // Arrange
      const body: ICreateRoleDTO = {
        name: 'teste',
        description: 'teste',
      };
      // Assert
      await expect(service.execute(body)).rejects.toThrowError();
    });
  });
});
