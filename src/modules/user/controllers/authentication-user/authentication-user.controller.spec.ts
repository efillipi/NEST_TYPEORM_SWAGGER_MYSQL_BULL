import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationUserController } from './authentication-user.controller';

describe('AuthenticationUserController', () => {
  let controller: AuthenticationUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationUserController],
    }).compile();

    controller = module.get<AuthenticationUserController>(
      AuthenticationUserController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
