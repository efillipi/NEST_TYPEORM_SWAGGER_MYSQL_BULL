import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AppError from 'src/shared/errors/AppError';
import { Repository } from 'typeorm';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import User from '../../entities/User';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(data: ICreateUserDTO) {
    const userExsists = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (userExsists) {
      throw new AppError('Email is already being used', 409);
    }

    return this.userRepository.save(this.userRepository.create(data));
  }
}
