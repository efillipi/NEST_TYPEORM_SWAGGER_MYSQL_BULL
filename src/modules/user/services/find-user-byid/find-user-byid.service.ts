import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AppError from 'src/shared/errors/AppError';
import { Repository } from 'typeorm';
import User from '../../entities/User';

@Injectable()
export class FindUserByidService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async findById(id: number) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }
}
