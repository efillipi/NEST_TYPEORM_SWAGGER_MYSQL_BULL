import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AppError from 'src/shared/errors/AppError';
import { AuthProviderService } from 'src/shared/providers/auth-provider/auth-provider.service';
import { HashProviderService } from 'src/shared/providers/hash-provider/hash-provider.service';
import { Repository } from 'typeorm';
import IRequestAuthenticationUserDTO from '../../dtos/IRequestAuthenticationUserDTO';
import User from '../../entities/User';

@Injectable()
export class AuthenticationUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private hashProviderService: HashProviderService,
    private authProviderService: AuthProviderService,
  ) {}

  async execute(data: IRequestAuthenticationUserDTO) {
    const userExsists = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (!userExsists) {
      throw new AppError('Authentication Failure', 401);
    }

    await this.hashProviderService.compareHash(
      data.password,
      userExsists.password,
    );

    const matchPassword = await this.hashProviderService.compareHash(
      data.password,
      userExsists.password,
    );

    if (!matchPassword) {
      throw new AppError('Authentication Failure', 401);
    }

    const token = await this.authProviderService.sing(userExsists);

    return { user: userExsists, token };
  }
}
