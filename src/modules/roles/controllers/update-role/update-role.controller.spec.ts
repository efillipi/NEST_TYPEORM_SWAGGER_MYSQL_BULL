import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from 'src/modules/user/entities/User';
import IUpdateRoleDTO from '../../dtos/IUpdateRoleDTO';
import Role from '../../entities/Role';
import { UpdateRoleService } from '../../services/update-role/update-role.service';
import { UpdateRoleController } from './update-role.controller';

const role = new Role({
  id: 1,
  name: 'teste',
  description: 'teste',
});

const user = new User({
  id: 1,
  name: 'teste',
});

describe('UpdateRoleController', () => {
  let controller: UpdateRoleController;
  let service: UpdateRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateRoleController],
      providers: [
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn().mockResolvedValue(user),
          },
        },
        {
          provide: UpdateRoleService,
          useValue: {
            execute: jest.fn().mockResolvedValue(role),
          },
        },
      ],
    }).compile();

    controller = module.get<UpdateRoleController>(UpdateRoleController);
    service = module.get<UpdateRoleService>(UpdateRoleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('Find', () => {
    it('Must be able to Find a role', async () => {
      // Act
      const body: IUpdateRoleDTO = {
        name: 'teste',
        description: 'teste',
      };

      const result = await controller.execute(role.id, body);

      // Assert
      expect(result).toBe(role);
      expect(service.execute).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Act
      const body: IUpdateRoleDTO = {
        name: 'teste',
        description: 'teste',
      };

      // Arrange
      jest.spyOn(service, 'execute').mockRejectedValueOnce(new Error());

      // Assert
      expect(controller.execute(role.id, body)).rejects.toThrowError();
    });
  });
});
