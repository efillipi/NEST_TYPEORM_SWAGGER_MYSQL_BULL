import { Injectable } from '@nestjs/common';
import AppError from 'src/shared/errors/AppError';
import IUpdateRoleDTO from '../../dtos/IUpdateRoleDTO';
import Role from '../../entities/Role';
import { RoleRepositoryService } from '../../repositories/RoleRepository';

@Injectable()
export class UpdateRoleService {
  private role: Role;
  constructor(private readonly roleRepository: RoleRepositoryService) {}

  public async execute(id: number, data: IUpdateRoleDTO) {
    this.role = await this.roleRepository.findSomething({ id });

    if (!this.role) {
      throw new AppError('Role not found', 404);
    }

    const roleExists = await this.roleRepository.findSomething({
      name: data.name,
    });

    if (roleExists && roleExists.id !== this.role.id) {
      throw new AppError('Role already registered', 409);
    }

    await this.roleRepository.merge(this.role, data);

    return await this.roleRepository.save(this.role);
  }
}
