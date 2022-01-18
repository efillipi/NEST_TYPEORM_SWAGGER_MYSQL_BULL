import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationUserService } from './authentication-user.service';

describe('AuthenticationUserService', () => {
  let service: AuthenticationUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthenticationUserService],
    }).compile();

    service = module.get<AuthenticationUserService>(AuthenticationUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
