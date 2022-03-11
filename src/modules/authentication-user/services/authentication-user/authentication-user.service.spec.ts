import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import User from 'src/modules/user/entities/User';
import { UserRepositoryService } from 'src/modules/user/repositories/UserRepository';
import FakeHashProvider from 'src/shared/providers/hash-provider/fakes/FakeHashProvider';
import { HashProviderService } from 'src/shared/providers/hash-provider/hash-provider.service';
import IRequestAuthenticationUserDTO from '../../dtos/IRequestAuthenticationUserDTO';
import { AuthenticationUserService } from './authentication-user.service';

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

      // Act
      const result = await service.execute(body);

      // Assert
      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('user');
      expect(repository.findSomething).toHaveBeenCalledTimes(1);
      expect(compareHash).toHaveBeenCalledWith(body.password, user.password);
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
  });
});
