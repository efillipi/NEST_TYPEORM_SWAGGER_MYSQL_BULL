import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from 'src/modules/user/entities/User';
import ICreateRoleDTO from '../../dtos/ICreateRoleDTO';
import Role from '../../entities/Role';
import { CreateRoleService } from '../../services/create-role/create-role.service';
import { CreateRoleController } from './create-role.controller';

const role = new Role({
  id: 1,
  name: 'teste',
  description: 'teste',
});

const user = new User({
  id: 1,
  name: 'teste',
});

describe('CreateRoleController', () => {
  let controller: CreateRoleController;
  let service: CreateRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateRoleController],
      providers: [
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn().mockResolvedValue(user),
          },
        },
        {
          provide: CreateRoleService,
          useValue: {
            execute: jest.fn().mockResolvedValue(role),
          },
        },
      ],
    }).compile();

    controller = module.get<CreateRoleController>(CreateRoleController);
    service = module.get<CreateRoleService>(CreateRoleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('Create', () => {
    it('Must be able to create a new role', async () => {
      // Act
      const body: ICreateRoleDTO = {
        name: 'teste',
        description: 'teste',
      };
      const result = await controller.execute(body);

      // Assert
      expect(result).toEqual(role);
      expect(service.execute).toHaveBeenCalledTimes(1);
      expect(service.execute).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      // Arrange
      const body: ICreateRoleDTO = {
        name: 'teste',
        description: 'teste',
      };
      jest.spyOn(service, 'execute').mockRejectedValueOnce(new Error());

      // Assert
      expect(controller.execute(body)).rejects.toThrowError();
    });
  });
});
