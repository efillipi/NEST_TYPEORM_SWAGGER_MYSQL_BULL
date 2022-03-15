import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from 'src/modules/user/entities/User';
import Role from '../../entities/Role';
import { FindRoleByIdService } from '../../services/find-role-by-id/find-role-by-id.service';
import { FindRoleByIdController } from './find-role-by-id.controller';

const role = new Role({
  id: 1,
  name: 'teste',
  description: 'teste',
});

const user = new User({
  id: 1,
  name: 'teste',
});

describe('FindRoleByIdController', () => {
  let controller: FindRoleByIdController;
  let service: FindRoleByIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindRoleByIdController],
      providers: [
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn().mockResolvedValue(user),
          },
        },
        {
          provide: FindRoleByIdService,
          useValue: {
            execute: jest.fn().mockResolvedValue(role),
          },
        },
      ],
    }).compile();

    controller = module.get<FindRoleByIdController>(FindRoleByIdController);
    service = module.get<FindRoleByIdService>(FindRoleByIdService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('Find', () => {
    it('Must be able to Find a role', async () => {
      // Act
      const result = await controller.execute(role.id);

      // Assert
      expect(result).toBe(role);
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
