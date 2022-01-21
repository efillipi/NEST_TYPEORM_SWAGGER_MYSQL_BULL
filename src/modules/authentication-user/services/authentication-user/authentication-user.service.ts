import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import IRequestAuthenticationUserDTO from 'src/modules/user/dtos/IRequestAuthenticationUserDTO';
import User from 'src/modules/user/entities/User';
import { UserRepositoryService } from 'src/modules/user/repositories/UserRepository';
import AppError from 'src/shared/errors/AppError';
import { HashProviderService } from 'src/shared/providers/hash-provider/hash-provider.service';

@Injectable()
export class AuthenticationUserService {
  private user: User;
  constructor(
    private readonly userRepository: UserRepositoryService,
    private readonly hashProviderService: HashProviderService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(data: IRequestAuthenticationUserDTO) {
    this.user = await this.userRepository.findSomething({
      email: data.email,
    });

    if (!this.user) {
      throw new AppError('Authentication Failure', 401);
    }

    const matchPassword = await this.hashProviderService.compareHash(
      data.password,
      this.user.password,
    );

    if (!matchPassword) {
      throw new AppError('Authentication Failure', 401);
    }

    const payload = {
      sub: this.user.id,
    };

    const token = this.jwtService.sign(payload);

    return { user: this.user, token };
  }
}
