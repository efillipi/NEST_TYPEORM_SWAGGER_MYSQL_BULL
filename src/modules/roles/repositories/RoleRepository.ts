import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeepPartial,
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import ICreateRoleDTO from '../dtos/ICreateRoleDTO';
import Role from '../entities/Role';

@Injectable()
export class RoleRepositoryService {
  private role: Role;
  constructor(
    @InjectRepository(Role)
    private readonly repository: Repository<Role>,
  ) {}

  public async create(data: ICreateRoleDTO): Promise<Role> {
    this.role = this.repository.create(data);
    return await this.save(this.role);
  }

  public async find(options?: FindManyOptions<Role>): Promise<Role[]> {
    return await this.repository.find(options);
  }

  public async findSomething(
    conditions: FindConditions<Role>,
    options?: FindOneOptions<Role>,
  ): Promise<Role> {
    return await this.repository.findOne(conditions, options);
  }

  public async save(data: Role): Promise<Role> {
    return await this.repository.save(data);
  }

  public async merge(role: Role, ...data: DeepPartial<Role>[]) {
    return this.repository.merge(role, ...data);
  }

  public async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
