import { BadRequestException, Injectable } from '@nestjs/common';
import { UserTokenRepositoryService } from 'src/modules/user-token/repositories/UserTokenRepository';
import { HashProviderService } from 'src/shared/providers/hash-provider/hash-provider.service';
import { UserRepositoryService } from '../../repositories/UserRepository';
import typeToken from 'src/config/typeToken';
import { addMinutes, isAfter } from 'date-fns';
const { FORGOT_PASSWORD } = typeToken;

@Injectable()
export class ResetPasswordService {
  constructor(
    private usersRepository: UserRepositoryService,

    private userTokenRepository: UserTokenRepositoryService,

    private hashProvider: HashProviderService,
  ) {}

  public async execute(data: any): Promise<void> {
    const userToken = await this.userTokenRepository.findSomething({
      token: data.token,
    });

    if (!userToken) {
      throw new BadRequestException('Invalid Token');
    }

    if (userToken.active === false) {
      throw new BadRequestException('Invalid Token');
    }

    if (userToken.type !== FORGOT_PASSWORD) {
      throw new BadRequestException('Invalid Token');
    }

    const tokenCreated_at = userToken.updated_at;
    const compareDate = addMinutes(
      tokenCreated_at,
      Number(process.env.TOKEN_TIME_MINUTES),
    );

    if (isAfter(Date.now(), compareDate)) {
      await this.userTokenRepository.delete(userToken.id);
      throw new BadRequestException('Expired Token');
    }

    const user = userToken.user;

    if (!user) {
      throw new BadRequestException('Invalid Token');
    }

    userToken.token = 'RESET EFETUADO';
    userToken.active = false;

    user.password = await this.hashProvider.generateHash(data.password);

    await this.userTokenRepository.save(userToken);
    await this.usersRepository.save(user);
  }
}
