import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AppError from 'src/shared/errors/AppError';
import { Repository } from 'typeorm';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';
import User from '../entities/User';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(data: ICreateUserDTO) {
    const userExsists = this.userRepository.findOne(data.email);

    if (userExsists) {
      throw new AppError('Email is already being used', 409);
    }

    return this.userRepository.save(this.userRepository.create(data));
  }

  async findById(id: number) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  async find() {
    return await this.userRepository.find();
  }

  async update(id: number, data: IUpdateUserDTO) {
    const user = await this.findById(id);

    this.userRepository.merge(user, data);

    return await this.userRepository.save(user);
  }

  async delete(id: number) {
    const user = await this.findById(id);

    await this.userRepository.delete(user.id);
  }
}
