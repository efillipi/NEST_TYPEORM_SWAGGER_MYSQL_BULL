import { Module } from '@nestjs/common';
import { MailTemplateProviderService } from '../mail-template-provider/mail-template-provider.service';
import { SendgridService } from './mail-provider/mail-provider.service';
import { EtherealMailProviderService } from './ethereal-mail-provider/ethereal-mail-provider.service';
import { MailExportsService } from './mail-exports/mail-exports.service';

@Module({
  providers: [
    SendgridService,
    MailTemplateProviderService,
    EtherealMailProviderService,
    MailExportsService,
  ],
  exports: [MailExportsService],
})
export class MailProviderModule {}
