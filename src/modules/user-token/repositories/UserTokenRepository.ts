import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import ICreateUserTokenDTO from '../dtos/ICreateUserTokenDTO';
import UserToken from '../entities/UserToken';
import randomNumbers from 'src/shared/helpers/randomNumbers';

@Injectable()
export class UserTokenRepositoryService {
  constructor(
    @InjectRepository(UserToken)
    private readonly repository: Repository<UserToken>,
  ) {}

  public async generate({
    id_user,
    tokenGenerate,
    type,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create({
      id_user,
      type,
      token: tokenGenerate === true ? await this.generateValidToken() : uuid(),
    });

    await this.repository.save(userToken);

    return userToken;
  }

  public async findSomething(
    conditions: FindConditions<UserToken>,
  ): Promise<UserToken> {
    return await this.repository.findOne(conditions, { relations: ['user'] });
  }

  public async find(): Promise<UserToken[]> {
    const userToken = await this.repository.find();

    return userToken;
  }

  public async save(token: UserToken): Promise<UserToken> {
    await this.repository.save(token);
    return token;
  }

  public async delete(id: number): Promise<void> {
    await this.repository.delete({ id });
  }

  private async generateValidToken(): Promise<string> {
    const token = randomNumbers();

    const existToken = await this.repository.findOne(token);

    if (existToken) {
      this.generateValidToken();
    }

    return token;
  }
}
