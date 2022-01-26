import { Injectable } from '@nestjs/common';
import UserToken from '../../entities/UserToken';
import { UserTokenRepositoryService } from '../../repositories/UserTokenRepository';

@Injectable()
export class ListUserTokenService {
  constructor(private readonly userRepository: UserTokenRepositoryService) {}

  async execute(): Promise<UserToken[]> {
    return await this.userRepository.find();
  }
}
