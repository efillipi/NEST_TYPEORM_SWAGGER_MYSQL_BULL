import { Injectable } from '@nestjs/common';
import AppError from 'src/shared/errors/AppError';
import Role from '../../entities/Role';
import { RoleRepositoryService } from '../../repositories/RoleRepository';

@Injectable()
export class FindRoleByIdService {
  private role: Role;
  constructor(private readonly roleRepository: RoleRepositoryService) {}

  public async execute(id: number) {
    this.role = await this.roleRepository.findSomething({ id });

    if (!this.role) {
      throw new AppError('Role not found', 404);
    }

    return this.role;
  }
}
