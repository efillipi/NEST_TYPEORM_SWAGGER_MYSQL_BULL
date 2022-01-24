import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import IRequestAuthenticationUserDTO from 'src/modules/user/dtos/IRequestAuthenticationUserDTO';
import User from 'src/modules/user/entities/User';
import { UserRepositoryService } from 'src/modules/user/repositories/UserRepository';
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
      throw new UnauthorizedException('Authentication Failure');
    }

    const matchPassword = await this.hashProviderService.compareHash(
      data.password,
      this.user.password,
    );

    if (!matchPassword) {
      throw new UnauthorizedException('Authentication Failure');
    }

    const payload = {
      sub: this.user.id,
    };

    const token = this.jwtService.sign(payload);

    return { user: this.user, token };
  }
}
