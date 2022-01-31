import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserTokenRepositoryService } from 'src/modules/user-token/repositories/UserTokenRepository';
import { UserRepositoryService } from '../../repositories/UserRepository';
import typeTokenConfig from 'src/config/typeToken';
import IForgotPasswordDTO from '../../dtos/IForgotPasswordDTO';
import { SendMailProducerService } from 'src/shared/jobs/send-mail/send-mail-producer/send-mail-producer.service';
const { FORGOT_PASSWORD } = typeTokenConfig;

@Injectable()
export class ForgotPasswordService {
  constructor(
    private usersRepository: UserRepositoryService,

    private mailProvider: SendMailProducerService,

    private userTokenRepository: UserTokenRepositoryService,
  ) {}

  public async execute(data: IForgotPasswordDTO): Promise<void> {
    const user = await this.usersRepository.findSomething({
      email: data.email,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.active === false) {
      throw new UnauthorizedException('Inactive user');
    }

    const { token } = await this.userTokenRepository.generate({
      id_user: user.id,
      type: FORGOT_PASSWORD,
      tokenGenerate: true,
    });

    await this.mailProvider.sendMailForgotPassword({
      user,
      token,
    });
  }
}
