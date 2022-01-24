import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import IUpdateUserDTO from '../../dtos/IUpdateUserDTO';
import User from '../../entities/User';
import { UserRepositoryService } from '../../repositories/UserRepository';

@Injectable()
export class UpdateUserService {
  private user: User;
  constructor(private readonly userRepository: UserRepositoryService) {}

  async execute(id: number, data: IUpdateUserDTO): Promise<User> {
    this.user = await this.userRepository.findSomething({ id });

    if (!this.user) {
      throw new BadRequestException('User not found');
    }

    const userExsists = await this.userRepository.findSomething({
      email: data.email,
    });

    if (userExsists && userExsists.id !== this.user.id) {
      throw new ConflictException('Email is already being used');
    }

    await this.userRepository.merge(this.user, data);

    return await this.userRepository.save(this.user);
  }
}
