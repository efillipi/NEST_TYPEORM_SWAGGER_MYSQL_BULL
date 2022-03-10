import { Test, TestingModule } from '@nestjs/testing';
import User from 'src/modules/user/entities/User';
import IRequestAuthenticationUserDTO from '../../dtos/IRequestAuthenticationUserDTO';
import { AuthenticationUserService } from '../../services/authentication-user/authentication-user.service';
import { AuthenticationUserController } from './authentication-user.controller';

const user = new User({
  id: 1,
  name: 'Teste',
  email: 'teste@teste.com',
  active: false,
  password: '123',
});

describe('AuthenticationUserController', () => {
  let controller: AuthenticationUserController;
  let service: AuthenticationUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationUserController],
      providers: [
        {
          provide: AuthenticationUserService,
          useValue: {
            execute: jest.fn().mockResolvedValue(user),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthenticationUserController>(
      AuthenticationUserController,
    );
    service = module.get<AuthenticationUserService>(AuthenticationUserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('Login', () => {
    it('should Login a new todo item successfully', async () => {
      // Arrange
      const body: IRequestAuthenticationUserDTO = {
        email: 'teste@teste.com',
        password: '123',
      };

      // Act
      const result = await controller.execute(body);

      // Assert
      expect(result).toEqual(user);
      expect(service.execute).toHaveBeenCalledTimes(1);
      expect(service.execute).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      // Arrange
      const body: IRequestAuthenticationUserDTO = {
        email: 'teste@teste.com',
        password: '123',
      };

      jest.spyOn(service, 'execute').mockRejectedValueOnce(new Error());

      // Assert
      expect(controller.execute(body)).rejects.toThrowError();
    });
  });
});
