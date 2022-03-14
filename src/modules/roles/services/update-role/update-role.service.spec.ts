import { Test, TestingModule } from '@nestjs/testing';
import IUpdateRoleDTO from '../../dtos/IUpdateRoleDTO';
import { FakeRoleRepository } from '../../repositories/Fakes/FakeRoleRepository';
import { RoleRepositoryService } from '../../repositories/RoleRepository';
import { UpdateRoleService } from './update-role.service';

describe('UpdateRoleService', () => {
  let service: UpdateRoleService;
  const repository: FakeRoleRepository = new FakeRoleRepository();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateRoleService,
        {
          provide: RoleRepositoryService,
          useValue: {
            findSomething: (payload: any) => repository.findSomething(payload),
            merge: (role: any, ...data: any) => repository.merge(role, ...data),
            save: (payload: any) => repository.save(payload),
          },
        },
      ],
    }).compile();

    service = module.get<UpdateRoleService>(UpdateRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Upadte Role', () => {
    it('Must be able to update a role', async () => {
      // Arrange
      const role = await repository.create({
        name: 'teste',
        description: 'teste',
      });

      const body: IUpdateRoleDTO = {
        name: 'teste update',
        description: 'teste update',
      };

      const findSomething = jest.spyOn(repository, 'findSomething');
      const save = jest.spyOn(repository, 'save');
      const merge = jest.spyOn(repository, 'merge');

      // Act
      const result = await service.execute(role.id, body);

      // Assert
      expect(result.name).toBe('teste update');
      expect(result.description).toBe('teste update');
      expect(findSomething).toHaveBeenCalledTimes(2);
      expect(merge).toHaveBeenCalledTimes(1);
      expect(save).toHaveBeenCalledTimes(1);
    });

    it('should not be able to update a role', async () => {
      // Arrange

      const body: IUpdateRoleDTO = {
        name: 'teste update',
        description: 'teste update',
      };
      // Assert
      await expect(service.execute(99, body)).rejects.toThrowError();
    });

    it('should not be able to create a update role with the same name', async () => {
      // Arrange

      const primayRole = await repository.create({
        name: 'primayRole',
        description: 'primayRole',
      });

      const secondaryRole = await repository.create({
        name: 'primayRole',
        description: 'primayRole',
      });

      const body: IUpdateRoleDTO = {
        name: primayRole.name,
        description: primayRole.description,
      };
      // Assert
      await expect(
        service.execute(secondaryRole.id, body),
      ).rejects.toThrowError();
    });
  });
});
