import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import ISendMailValidateAcountDTO from '../dtos/ISendMailValidateAcountDTO';
import { emailConfirmation, forgotPassword } from 'src/config/templateEmail';

@Injectable()
export class SendMailProducerService {
  constructor(@InjectQueue('sendMail-queue') private queue: Queue) {}

  async sendMailValidateAcount(data: ISendMailValidateAcountDTO) {
    const { token, user } = data;

    await this.queue.add('sendMail-job', {
      to: {
        email: user.email,
        name: user.name,
      },
      subject: 'Confirmação de email ',
      templateData: {
        file: emailConfirmation,
        variables: {
          name: user.name,
          token,
          link: `${process.env.APP_API_URL}/validate-acount/${token}`,
        },
      },
    });
  }

  async sendMailForgotPassword(data: ISendMailValidateAcountDTO) {
    const { token, user } = data;

    await this.queue.add('sendMail-job', {
      to: {
        email: user.email,
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
  }
}
