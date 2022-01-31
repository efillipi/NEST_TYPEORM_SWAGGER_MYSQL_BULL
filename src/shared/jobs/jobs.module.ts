import { BullModule, InjectQueue } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MiddlewareBuilder } from '@nestjs/core';
import { Queue } from 'bull';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';
import { MailProviderModule } from '../providers/mail-provider/mail-provider.module';
import { SendMailConsumerService } from './send-mail/send-mail-consumer/send-mail-consumer.service';
import { SendMailProducerService } from './send-mail/send-mail-producer/send-mail-producer.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
      },
    }),
    BullModule.registerQueue({
      name: 'sendMail-queue',
    }),
    MailProviderModule,
  ],
  providers: [SendMailProducerService, SendMailConsumerService],
  exports: [SendMailProducerService],
})
export class JobsModule {
  constructor(@InjectQueue('sendMail-queue') private sendMailQueue: Queue) {}
  configure(consumer: MiddlewareBuilder) {
    const { router } = createBullBoard([new BullAdapter(this.sendMailQueue)]);

    consumer.apply(router).forRoutes('admin/queues');
  }
}
