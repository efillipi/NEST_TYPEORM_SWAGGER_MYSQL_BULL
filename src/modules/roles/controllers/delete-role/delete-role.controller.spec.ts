import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from 'src/modules/user/entities/User';
import Role from '../../entities/Role';
import { DeleteRoleService } from '../../services/delete-role/delete-role.service';
import { DeleteRoleController } from './delete-role.controller';

const role = new Role({
  id: 1,
  name: 'teste',
  description: 'teste',
});

const user = new User({
  id: 1,
  name: 'teste',
});

describe('DeleteRoleController', () => {
  let controller: DeleteRoleController;
  let service: DeleteRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteRoleController],
      providers: [
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn().mockResolvedValue(user),
          },
        },
        {
          provide: DeleteRoleService,
          useValue: {
            execute: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<DeleteRoleController>(DeleteRoleController);
    service = module.get<DeleteRoleService>(DeleteRoleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('Delete', () => {
    it('Must be able to delete a role', async () => {
      // Act
      const result = await controller.execute(role.id);

      // Assert
      expect(result).toBeUndefined();
      expect(service.execute).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(service, 'execute').mockRejectedValueOnce(new Error());

      // Assert
      expect(controller.execute(role.id)).rejects.toThrowError();
    });
  });
});
