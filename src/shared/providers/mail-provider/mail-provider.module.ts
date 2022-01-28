import { Module } from '@nestjs/common';
import { MailTemplateProviderService } from '../mail-template-provider/mail-template-provider.service';
import { SendgridService } from './mail-provider/mail-provider.service';
import { EtherealMailProviderService } from './ethereal-mail-provider/ethereal-mail-provider.service';

@Module({
  providers: [
    SendgridService,
    MailTemplateProviderService,
    EtherealMailProviderService,
  ],
  exports: [SendgridService, EtherealMailProviderService],
})
export class MailProviderModule {}
