import { Injectable } from '@nestjs/common';
import AppError from 'src/shared/errors/AppError';
import IUpdateUserDTO from '../../dtos/IUpdateUserDTO';
import User from '../../entities/User';
import { UserRepositoryService } from '../../repositories/UserRepository';

@Injectable()
export class UpdateUserService {
  private user: User;
  constructor(private readonly userRepository: UserRepositoryService) {}

  async update(id: number, data: IUpdateUserDTO): Promise<User> {
    this.user = await this.userRepository.findSomething({ id });

    if (!this.user) {
      throw new AppError('User not found', 404);
    }

    this.userRepository.merge(this.user, data);

    return await this.userRepository.save(this.user);
  }
}
