import { Injectable } from '@nestjs/common';
import { MailTemplateProviderService } from '../../mail-template-provider/mail-template-provider.service';
import ISenMailDTO from '../dtos/ISenMailDTO';
import {
  Transporter,
  createTransport,
  getTestMessageUrl,
  createTestAccount,
} from 'nodemailer';

@Injectable()
export class EtherealMailProviderService {
  private client: Transporter;

  constructor(private mailTemplateProvider: MailTemplateProviderService) {
    createTestAccount().then((account) => {
      const transporter = createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async sendMail({ to, from, subject, templateData }: ISenMailDTO) {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe DEV',
        address: from?.email || process.env.MAIL_CONTACT,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', getTestMessageUrl(message));
  }
}
