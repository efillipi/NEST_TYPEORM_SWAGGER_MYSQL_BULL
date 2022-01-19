import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeepPartial,
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../entities/User';

@Injectable()
export class UserRepositoryService {
  private user: User;
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  public async create(data: ICreateUserDTO): Promise<User | undefined> {
    this.user = this.repository.create(data);
    return await this.save(this.user);
  }

  public async find(options?: FindManyOptions<User>): Promise<User[]> {
    return await this.repository.find(options);
  }

  public async findSomething(
    conditions: FindConditions<User>,
    options?: FindOneOptions<User>,
  ): Promise<User | undefined> {
    return await this.repository.findOne(conditions, options);
  }

  public async save(data: User): Promise<User> {
    return await this.repository.save(data);
  }

  public async merge(user: User, ...data: DeepPartial<User>[]) {
    return this.repository.merge(user, ...data);
  }

  public async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
