import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { HashProviderService } from 'src/shared/providers/hash-provider/hash-provider.service';
import IUpdateProfileDTO from '../../dtos/IUpdateProfileDTO';
import User from '../../entities/User';
import { UserRepositoryService } from '../../repositories/UserRepository';

@Injectable()
export class UpdateProfileService {
  private user: User;
  constructor(
    private readonly userRepository: UserRepositoryService,
    private hashProviderService: HashProviderService,
  ) {}

  async execute(id: number, data: IUpdateProfileDTO): Promise<User> {
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

    if (data.password) {
      const hash = await this.hashProviderService.generateHash(data.password);
      data.password = hash;
    }

    await this.userRepository.merge(this.user, data);

    return await this.userRepository.save(this.user);
  }
}
