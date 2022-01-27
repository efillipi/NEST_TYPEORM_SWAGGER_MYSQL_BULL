import { Module } from '@nestjs/common';
import { MailTemplateProviderService } from '../mail-template-provider/mail-template-provider.service';
import { MailProviderService } from './mail-provider/mail-provider.service';

@Module({
  providers: [MailProviderService, MailTemplateProviderService],
  exports: [MailProviderService],
})
export class MailProviderModule {}
