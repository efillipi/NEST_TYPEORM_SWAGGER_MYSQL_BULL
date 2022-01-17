import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AppError from 'src/shared/errors/AppError';
import { Repository } from 'typeorm';
import IUpdateUserDTO from '../../dtos/IUpdateUserDTO';
import User from '../../entities/User';

@Injectable()
export class UpdateUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async update(id: number, data: IUpdateUserDTO) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    this.userRepository.merge(user, data);

    return await this.userRepository.save(user);
  }
}
