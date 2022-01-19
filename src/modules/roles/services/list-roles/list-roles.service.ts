import { Injectable } from '@nestjs/common';
import { RoleRepositoryService } from '../../repositories/RoleRepository';

@Injectable()
export class ListRolesService {
  constructor(private readonly roleRepository: RoleRepositoryService) {}

  public async execute() {
    return await this.roleRepository.find();
  }
}
