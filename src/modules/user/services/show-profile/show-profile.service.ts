import { Injectable, NotFoundException } from '@nestjs/common';
import User from '../../entities/User';
import { UserRepositoryService } from '../../repositories/UserRepository';

interface IRequest {
  userId: number;
}
@Injectable()
export class ShowProfileService {
  private user: User;
  constructor(private readonly userRepository: UserRepositoryService) {}
  async execute({ userId }: IRequest): Promise<User> {
    this.user = await this.userRepository.findSomething({ id: userId });

    if (!this.user) {
      throw new NotFoundException('User not found');
    }

    return this.user;
  }
}
