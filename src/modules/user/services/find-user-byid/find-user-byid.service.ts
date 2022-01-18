import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AppError from 'src/shared/errors/AppError';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import User from '../../entities/User';

@Injectable()
export class FindUserByidService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async findOneOrFail(
    conditions?: FindConditions<User>,
    options?: FindOneOptions<User>,
  ) {
    const user = await this.userRepository.findOneOrFail(conditions, options);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }
}
