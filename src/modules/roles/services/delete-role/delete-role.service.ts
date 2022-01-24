import { Injectable, NotFoundException } from '@nestjs/common';
import Role from '../../entities/Role';
import { RoleRepositoryService } from '../../repositories/RoleRepository';

@Injectable()
export class DeleteRoleService {
  private role: Role;
  constructor(private readonly roleRepository: RoleRepositoryService) {}

  public async execute(id: number) {
    this.role = await this.roleRepository.findSomething({ id });

    if (!this.role) {
      throw new NotFoundException('Role not found');
    }

    await this.roleRepository.delete(id);
  }
}
