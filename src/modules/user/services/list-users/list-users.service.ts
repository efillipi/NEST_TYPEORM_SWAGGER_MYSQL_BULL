import { Injectable } from '@nestjs/common';
import User from '../../entities/User';
import { UserRepositoryService } from '../../repositories/UserRepository';

@Injectable()
export class ListUsersService {
  constructor(private readonly userRepository: UserRepositoryService) {}

  async find(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
