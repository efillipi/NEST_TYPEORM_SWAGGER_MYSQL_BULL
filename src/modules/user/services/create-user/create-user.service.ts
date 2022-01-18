import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AppError from 'src/shared/errors/AppError';
import { HashProviderService } from 'src/shared/providers/hash-provider/hash-provider.service';
import { Repository } from 'typeorm';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import User from '../../entities/User';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private hashProviderService: HashProviderService,
  ) {}
  async create(data: ICreateUserDTO) {
    const userExsists = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (userExsists) {
      throw new AppError('Email is already being used', 409);
    }

    const hash = await this.hashProviderService.generateHash(data.password);

    const user = this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hash,
    });

    return this.userRepository.save(user);
  }
}
