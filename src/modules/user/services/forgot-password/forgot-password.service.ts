import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserTokenRepositoryService } from 'src/modules/user-token/repositories/UserTokenRepository';
import { MailExportsService } from 'src/shared/providers/mail-provider/mail-exports/mail-exports.service';
import { UserRepositoryService } from '../../repositories/UserRepository';
import { forgotPassword } from 'src/config/templateEmail';
import typeTokenConfig from 'src/config/typeToken';
import IForgotPasswordDTO from '../../dtos/IForgotPasswordDTO';
const { FORGOT_PASSWORD } = typeTokenConfig;

@Injectable()
export class ForgotPasswordService {
  constructor(
    private usersRepository: UserRepositoryService,

    private mailProvider: MailExportsService,

    private userTokenRepository: UserTokenRepositoryService,
  ) {}

  public async execute(
    data: IForgotPasswordDTO,
  ): Promise<{ sendMail: string | boolean }> {
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

    try {
      const sendMail = await this.mailProvider.sendMail({
        to: {
          email: data.email,
          name: user.name,
        },
        subject: 'Recuperação de senha ',
        templateData: {
          file: forgotPassword,
          variables: {
            name: user.name,
            token,
          },
        },
      });

      return { sendMail };
    } catch (error) {
      throw new BadRequestException(
        'Failed to send confirmation token to email',
      );
    }
  }
}
