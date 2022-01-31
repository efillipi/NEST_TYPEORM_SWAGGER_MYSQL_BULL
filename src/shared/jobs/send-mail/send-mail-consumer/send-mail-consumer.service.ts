import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import ISenMailDTO from 'src/shared/providers/mail-provider/dtos/ISenMailDTO';
import { MailExportsService } from 'src/shared/providers/mail-provider/mail-exports/mail-exports.service';

@Processor('sendMail-queue')
export class SendMailConsumerService {
  constructor(private mailService: MailExportsService) {}

  @Process('sendMail-job')
  async sendMailJob(job: Job<ISenMailDTO>) {
    await this.mailService.sendMail(job.data);
  }
}
