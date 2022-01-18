import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import IRequestAuthenticationUserDTO from 'src/modules/user/dtos/IRequestAuthenticationUserDTO';
import User from 'src/modules/user/entities/User';
import { FindUserByidService } from 'src/modules/user/services/find-user-byid/find-user-byid.service';
import AppError from 'src/shared/errors/AppError';
import { HashProviderService } from 'src/shared/providers/hash-provider/hash-provider.service';

@Injectable()
export class AuthenticationUserService {
  private user: User;
  constructor(
    private readonly findUserByidService: FindUserByidService,
    private hashProviderService: HashProviderService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(data: IRequestAuthenticationUserDTO) {
    try {
      this.user = await this.findUserByidService.findOneOrFail({
        email: data.email,
      });
    } catch (error) {
      throw new AppError('Authentication Failure', 401);
    }

    const matchPassword = await this.hashProviderService.compareHash(
      data.password,
      this.user.password,
    );

    if (!matchPassword) {
      throw new AppError('Authentication Failure', 401);
    }

    const payload = { sub: this.user.id, email: this.user.email };

    const token = this.jwtService.sign(payload);

    return { user: this.user, token };
  }
}
