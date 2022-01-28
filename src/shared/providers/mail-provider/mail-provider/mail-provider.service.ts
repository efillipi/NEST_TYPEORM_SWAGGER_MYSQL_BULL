import { Injectable } from '@nestjs/common';
import { MailService } from '@sendgrid/mail';
import { MailTemplateProviderService } from '../../mail-template-provider/mail-template-provider.service';
import ISenMailDTO from '../dtos/ISenMailDTO';

@Injectable()
export class SendgridService {
  private client: MailService;

  constructor(private mailTemplateProvider: MailTemplateProviderService) {
    this.client = new MailService();
  }

  public async sendMail({
    to,
    subject,
    templateData,
  }: ISenMailDTO): Promise<boolean> {
    try {
      this.client.setApiKey(process.env.SG_API_KEY);

      await this.client.send({
        from: process.env.MAIL_CONTACT as string,
        to: to.email,
        subject,
        html: await this.mailTemplateProvider.parse(templateData),
      });

      return true;
    } catch (error) {
      return false;
    }
  }
}
