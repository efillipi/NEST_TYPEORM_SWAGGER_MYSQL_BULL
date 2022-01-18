import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import IRequestAuthenticationUserDTO from 'src/modules/user/dtos/IRequestAuthenticationUserDTO';
import User from 'src/modules/user/entities/User';
import { FindUserByidService } from 'src/modules/user/services/find-user-byid/find-user-byid.service';
import { AuthProviderService } from 'src/shared/providers/auth-provider/auth-provider.service';
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
      return null;
    }

    const matchPassword = await this.hashProviderService.compareHash(
      data.password,
      this.user.password,
    );

    if (!matchPassword) {
      return null;
    }

    const payload = { sub: this.user.id, email: this.user.email };

    const token = this.jwtService.sign(payload);

    return { user: this.user, token };
  }
}
