import { BadRequestException, Injectable } from '@nestjs/common';
import { UserTokenRepositoryService } from 'src/modules/user-token/repositories/UserTokenRepository';
import { UserRepositoryService } from '../../repositories/UserRepository';
import { isAfter, addMinutes } from 'date-fns';
import typeTokenConfig from 'src/config/typeToken';
const { VALIDATE_CONTA_SERVICE } = typeTokenConfig;

interface IRequest {
  token: string;
}

@Injectable()
export class ValidateAcountService {
  constructor(
    private usersRepository: UserRepositoryService,

    private userTokenRepository: UserTokenRepositoryService,
  ) {}
  public async execute({ token }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findSomething({ token });

    if (!userToken) {
      throw new BadRequestException('Invalid Token');
    }

    if (userToken.type !== VALIDATE_CONTA_SERVICE) {
      throw new BadRequestException('Invalid Token');
    }

    if (userToken.active === false) {
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

    user.active = true;
    userToken.active = false;
    await this.usersRepository.save(user);
    await this.userTokenRepository.save(userToken);
  }
}
