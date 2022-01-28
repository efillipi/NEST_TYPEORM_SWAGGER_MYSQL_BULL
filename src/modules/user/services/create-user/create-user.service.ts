import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import User from '../../entities/User';
import { RoleRepositoryService } from 'src/modules/roles/repositories/RoleRepository';
import { UserTokenRepositoryService } from 'src/modules/user-token/repositories/UserTokenRepository';
import { HashProviderService } from 'src/shared/providers/hash-provider/hash-provider.service';
import IRequestCreateUserDTO from '../../dtos/IRequestCreateUserDTO';
import { UserRepositoryService } from '../../repositories/UserRepository';
import typeTokenConfig from 'src/config/typeToken';
import { emailConfirmation } from 'src/config/templateEmail';
import { MailExportsService } from 'src/shared/providers/mail-provider/mail-exports/mail-exports.service';
const { VALIDATE_CONTA } = typeTokenConfig;

@Injectable()
export class CreateUserService {
  private user: User;

  constructor(
    private readonly userRepository: UserRepositoryService,
    private readonly roleRepository: RoleRepositoryService,
    private hashProviderService: HashProviderService,
    private userTokenRepository: UserTokenRepositoryService,
    private mailProviderService: MailExportsService,
  ) {}
  async execute(data: IRequestCreateUserDTO): Promise<{
    user: User;
    sendMail: string | boolean;
  }> {
    const userExsists = await this.userRepository.findSomething({
      email: data.email,
    });

    if (userExsists) {
      throw new ConflictException('Email is already being used');
    }

    const rolesExists = await this.roleRepository.findByNames(data.roles);

    if (rolesExists.length !== data.roles.length) {
      throw new NotFoundException('Role or Roles not found');
    }

    const hash = await this.hashProviderService.generateHash(data.password);

    this.user = await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hash,
      roles: rolesExists,
    });

    const { token } = await this.userTokenRepository.generate({
      id_user: this.user.id,
      type: VALIDATE_CONTA,
    });

    try {
      const sendMail = await this.mailProviderService.sendMail({
        to: {
          email: data.email,
          name: data.name,
        },
        subject: 'Confirmação de email ',
        templateData: {
          file: emailConfirmation,
          variables: {
            name: data.name,
            token,
            link: `${process.env.APP_API_URL}/validate-acount/${token}`,
          },
        },
      });
      return { user: this.user, sendMail };
    } catch (error) {
      await this.userRepository.delete(this.user.id);
      throw new BadRequestException(
        'Failed to send confirmation token to email',
      );
    }
  }
}
