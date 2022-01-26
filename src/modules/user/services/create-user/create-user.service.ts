import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { RoleRepositoryService } from 'src/modules/roles/repositories/RoleRepository';
import { UserTokenRepositoryService } from 'src/modules/user-token/repositories/UserTokenRepository';
import { HashProviderService } from 'src/shared/providers/hash-provider/hash-provider.service';
import IRequestCreateUserDTO from '../../dtos/IRequestCreateUserDTO';
import User from '../../entities/User';
import { UserRepositoryService } from '../../repositories/UserRepository';

@Injectable()
export class CreateUserService {
  private user: User;
  constructor(
    private readonly userRepository: UserRepositoryService,
    private readonly roleRepository: RoleRepositoryService,
    private hashProviderService: HashProviderService,
    private userTokenRepository: UserTokenRepositoryService,
  ) {}
  async execute(data: IRequestCreateUserDTO): Promise<User> {
    const userExsists = await this.userRepository.findSomething({
      email: data.email,
    });

    if (userExsists) {
      throw new ConflictException('Email is already being used');
    }

    const rolesExists = await this.roleRepository.findByNames(data.roles);

    if (rolesExists.length !== data.roles.length) {
      throw new NotFoundException('Role or Roles not found');
    }

    const hash = await this.hashProviderService.generateHash(data.password);

    this.user = await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hash,
      roles: rolesExists,
    });

    await this.userTokenRepository.generate({
      id_user: this.user.id,
      type: 'ValidateContaService',
    });

    return this.user;
  }
}
