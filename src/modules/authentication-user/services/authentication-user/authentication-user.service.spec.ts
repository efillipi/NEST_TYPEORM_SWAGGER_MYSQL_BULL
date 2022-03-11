import { Test, TestingModule } from '@nestjs/testing';
import { UserRepositoryService } from 'src/modules/user/repositories/UserRepository';
import { AuthenticationUserService } from './authentication-user.service';
import { FakeHashProvider } from 'src/shared/providers/hash-provider/fakes/FakeHashProvider';
import User from 'src/modules/user/entities/User';
import { HashProviderService } from 'src/shared/providers/hash-provider/hash-provider.service';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import IRequestAuthenticationUserDTO from '../../dtos/IRequestAuthenticationUserDTO';
import FakeJWTAuthProvider from 'src/shared/providers/AuthProvider/fakes/FakeJWTAuthProvider';

const user = new User({
  id: 1,
  name: 'Teste',
  email: 'teste@teste.com',
  active: false,
  password: '123',
});

describe('AuthenticationUserService', () => {
  let service: AuthenticationUserService;
  let repository: UserRepositoryService;
  const jwtService: FakeJWTAuthProvider = new FakeJWTAuthProvider();
  const hashProviderService: FakeHashProvider = new FakeHashProvider();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        PassportModule,
        JwtModule.register({
          privateKey: process.env.JWT_KEY,
          signOptions: { expiresIn: process.env.JWT_EXPIRESIN },
        }),
      ],
      providers: [
        AuthenticationUserService,
        {
          provide: UserRepositoryService,
          useValue: {
            findSomething: jest.fn().mockResolvedValue(user),
          },
        },
        {
          provide: HashProviderService,
          useValue: {
            compareHash: (payload: string, hashed: string) =>
              hashProviderService.compareHash(payload, hashed),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: (payload: any) => jwtService.sign(payload),
          },
        },
      ],
    }).compile();

    service = module.get<AuthenticationUserService>(AuthenticationUserService);
    repository = module.get<UserRepositoryService>(UserRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('Login', () => {
    it('should Login a new todo item successfully', async () => {
      // Arrange
      const body: IRequestAuthenticationUserDTO = {
        email: 'teste@teste.com',
        password: '123',
      };

      const compareHash = jest.spyOn(hashProviderService, 'compareHash');
      const sign = jest.spyOn(jwtService, 'sign');

      // Act
      const result = await service.execute(body);

      // Assert
      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('user');
      expect(repository.findSomething).toHaveBeenCalledTimes(1);
      expect(compareHash).toHaveBeenCalledTimes(1);
      expect(sign).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      const body: IRequestAuthenticationUserDTO = {
        email: 'teste@teste.com',
        password: '123',
      };

      jest.spyOn(service, 'execute').mockRejectedValueOnce(new Error());

      // Assert
      expect(service.execute(body)).rejects.toThrowError();
    });

    // it('should not be able to log in with invalid email', async () => {
    //   await expect(
    //     service.execute({
    //       email: 'test@teste.com',
    //       password: '123',
    //     }),
    //   ).rejects.toThrowError();
    // });

    it('should not be able to log in with invalid password', async () => {
      await expect(
        service.execute({
          email: 'teste@teste.com',
          password: '1234',
        }),
      ).rejects.toThrowError();
    });
  });
});
