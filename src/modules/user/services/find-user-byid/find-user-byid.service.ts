import { Injectable, NotFoundException } from '@nestjs/common';
import User from '../../entities/User';
import { UserRepositoryService } from '../../repositories/UserRepository';

@Injectable()
export class FindUserByidService {
  private user: User;
  constructor(private readonly userRepository: UserRepositoryService) {}
  async execute(id: number): Promise<User> {
    this.user = await this.userRepository.findSomething({ id });

    if (!this.user) {
      throw new NotFoundException('User not found');
    }

    return this.user;
  }
}
