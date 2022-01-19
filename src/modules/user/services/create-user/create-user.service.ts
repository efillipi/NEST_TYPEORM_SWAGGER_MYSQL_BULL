import { Injectable } from '@nestjs/common';
import AppError from 'src/shared/errors/AppError';
import { HashProviderService } from 'src/shared/providers/hash-provider/hash-provider.service';

import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import User from '../../entities/User';
import { UserRepositoryService } from '../../repositories/UserRepository';

@Injectable()
export class CreateUserService {
  private user: User;
  constructor(
    private readonly userRepository: UserRepositoryService,

    private hashProviderService: HashProviderService,
  ) {}
  async execute(data: ICreateUserDTO): Promise<User> {
    const userExsists = await this.userRepository.findSomething({
      email: data.email,
    });

    if (userExsists) {
      throw new AppError('Email is already being used', 409);
    }

    const hash = await this.hashProviderService.generateHash(data.password);

    this.user = await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hash,
    });

    return this.user;
  }
}
