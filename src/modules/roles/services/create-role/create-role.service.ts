import { Injectable, ConflictException } from '@nestjs/common';
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
      throw new ConflictException('Role already registered');
    }

    return await this.roleRepository.create(data);
  }
}
