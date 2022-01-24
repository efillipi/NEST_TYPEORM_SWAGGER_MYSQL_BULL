import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { RoleRepositoryService } from 'src/modules/roles/repositories/RoleRepository';
import { HashProviderService } from 'src/shared/providers/hash-provider/hash-provider.service';
import IUpdateUserDTO from '../../dtos/IUpdateUserDTO';

import User from '../../entities/User';
import { UserRepositoryService } from '../../repositories/UserRepository';

@Injectable()
export class UpdateUserService {
  private user: User;
  constructor(
    private readonly userRepository: UserRepositoryService,
    private readonly roleRepository: RoleRepositoryService,
    private hashProviderService: HashProviderService,
  ) {}

  async execute(id: number, data: IUpdateUserDTO): Promise<User> {
    this.user = await this.userRepository.findSomething({ id });

    if (!this.user) {
      throw new NotFoundException('User not found');
    }

    const userExsists = await this.userRepository.findSomething({
      email: data.email,
    });

    if (userExsists && userExsists.id !== this.user.id) {
      throw new ConflictException('Email is already being used');
    }

    if (data.roles) {
      const rolesExists = await this.roleRepository.findByNames(data.roles);

      if (rolesExists.length !== data.roles.length) {
        throw new NotFoundException('Role or Roles not found');
      }

      this.user.roles = rolesExists;
    }

    if (data.password) {
      const hash = await this.hashProviderService.generateHash(data.password);
      this.user.password = hash;
    }

    this.user.name = data.name;
    this.user.email = data.email;

    return await this.userRepository.save(this.user);
  }
}
