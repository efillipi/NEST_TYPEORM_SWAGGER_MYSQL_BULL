import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from 'src/modules/user/entities/User';
import Role from '../../entities/Role';
import { ListRolesService } from '../../services/list-roles/list-roles.service';
import { ListRolesController } from './list-roles.controller';

const role = [
  new Role({
    id: 1,
    name: 'teste',
    description: 'teste',
  }),
];

const user = new User({
  id: 1,
  name: 'teste',
});

describe('ListRolesController', () => {
  let controller: ListRolesController;
  let service: ListRolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListRolesController],
      providers: [
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn().mockResolvedValue(user),
          },
        },
        {
          provide: ListRolesService,
          useValue: {
            execute: jest.fn().mockResolvedValue(role),
          },
        },
      ],
    }).compile();

    controller = module.get<ListRolesController>(ListRolesController);
    service = module.get<ListRolesService>(ListRolesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
  describe('List', () => {
    it('Must be able to list functions', async () => {
      // Act
      const result = await controller.execute();

      // Assert
      expect(result.length).toBe(1);
      expect(service.execute).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(service, 'execute').mockRejectedValueOnce(new Error());

      // Assert
      expect(controller.execute()).rejects.toThrowError();
    });
  });
});
