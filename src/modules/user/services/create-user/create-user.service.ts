import { Injectable } from '@nestjs/common';
import { RoleRepositoryService } from 'src/modules/roles/repositories/RoleRepository';
import AppError from 'src/shared/errors/AppError';
import { HashProviderService } from 'src/shared/providers/hash-provider/hash-provider.service';
import User from '../../entities/User';
import { UserRepositoryService } from '../../repositories/UserRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  roles: string[];
}

@Injectable()
export class CreateUserService {
  private user: User;
  constructor(
    private readonly userRepository: UserRepositoryService,
    private readonly roleRepository: RoleRepositoryService,

    private hashProviderService: HashProviderService,
  ) {}
  async execute(data: IRequest): Promise<User> {
    const userExsists = await this.userRepository.findSomething({
      email: data.email,
    });

    if (userExsists) {
      throw new AppError('Email is already being used', 409);
    }

    const rolesExists = await this.roleRepository.findByNames(data.roles);

    if (rolesExists.length !== data.roles.length) {
      throw new AppError('Role or Roles not found', 404);
    }

    const hash = await this.hashProviderService.generateHash(data.password);

    this.user = await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hash,
      roles: rolesExists,
    });

    return this.user;
  }
}
