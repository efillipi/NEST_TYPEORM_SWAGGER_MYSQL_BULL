import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
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
      throw new NotFoundException('Role not found');
    }

    const roleExists = await this.roleRepository.findSomething({
      name: data.name,
    });

    if (roleExists && roleExists.id !== this.role.id) {
      throw new ConflictException('Role already registered');
    }

    await this.roleRepository.merge(this.role, data);

    return await this.roleRepository.save(this.role);
  }
}
