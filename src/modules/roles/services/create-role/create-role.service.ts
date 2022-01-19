import { Injectable } from '@nestjs/common';
import AppError from 'src/shared/errors/AppError';
import ICreateRoleDTO from '../../dtos/ICreateRoleDTO';
import Role from '../../entities/Role';
import { RoleRepositoryService } from '../../repositories/RoleRepository';

@Injectable()
export class CreateRoleService {
  private role: Role;
  constructor(private readonly roleRepository: RoleRepositoryService) {}

  public async execute(data: ICreateRoleDTO) {
    this.role = await this.roleRepository.findSomething({ name: data.name });

    if (this.role) {
      throw new AppError('Role already registered', 409);
    }

    return await this.roleRepository.create(data);
  }
}
