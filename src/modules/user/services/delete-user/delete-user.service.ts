import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AppError from 'src/shared/errors/AppError';
import { Repository } from 'typeorm';
import User from '../../entities/User.entity';

@Injectable()
export class DeleteUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async delete(id: number) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    await this.userRepository.delete(user.id);
  }
}
