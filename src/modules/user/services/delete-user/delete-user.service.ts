import { Injectable } from '@nestjs/common';
import AppError from 'src/shared/errors/AppError';
import User from '../../entities/User';
import { UserRepositoryService } from '../../repositories/UserRepository';

@Injectable()
export class DeleteUserService {
  private user: User;
  constructor(private readonly userRepository: UserRepositoryService) {}
  async delete(id: number): Promise<void> {
    this.user = await this.userRepository.findSomething({ id });

    if (!this.user) {
      throw new AppError('User not found', 404);
    }

    await this.userRepository.delete(id);
  }
}
