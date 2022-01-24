import { Injectable, NotFoundException } from '@nestjs/common';
import User from '../../entities/User';
import { UserRepositoryService } from '../../repositories/UserRepository';

@Injectable()
export class DeleteUserService {
  private user: User;
  constructor(private readonly userRepository: UserRepositoryService) {}
  async execute(id: number): Promise<void> {
    this.user = await this.userRepository.findSomething({ id });

    if (!this.user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.delete(id);
  }
}
