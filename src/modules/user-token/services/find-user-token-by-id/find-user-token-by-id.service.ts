import { Injectable, NotFoundException } from '@nestjs/common';
import UserToken from '../../entities/UserToken';
import Token from '../../entities/UserToken';
import { UserTokenRepositoryService } from '../../repositories/UserTokenRepository';

@Injectable()
export class FindUserTokenByIdService {
  private user: Token;
  constructor(private readonly userRepository: UserTokenRepositoryService) {}
  async execute(id: number): Promise<UserToken> {
    this.user = await this.userRepository.findSomething({ id });

    if (!this.user) {
      throw new NotFoundException('UserToken not found');
    }

    return this.user;
  }
}
