import { Injectable } from '@nestjs/common';
import ISenMailDTO from '../dtos/ISenMailDTO';
import { EtherealMailProviderService } from '../ethereal-mail-provider/ethereal-mail-provider.service';
import { SendgridService } from '../mail-provider/mail-provider.service';

@Injectable()
export class MailExportsService {
  constructor(
    private sendGrid: SendgridService,
    private fakeMail: EtherealMailProviderService,
  ) {}
  public async sendMail(data: ISenMailDTO) {
    switch (process.env.MAIL_DRIVER) {
      case 'mailProd':
        return await this.sendGrid.sendMail(data);
      default:
        return await this.fakeMail.sendMail(data);
    }
  }
}
