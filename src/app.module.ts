import { Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { HashProviderService } from './shared/providers/hash-provider/hash-provider.service';
import { AuthenticationUserModule } from './modules/authentication-user/authentication-user.module';
import { RolesModule } from './modules/roles/roles.module';
import { DiskStorageProviderService } from './shared/providers/disk-storage-provider/disk-storage-provider.service';
import { UserTokenModule } from './modules/user-token/user-token.module';
import { MailTemplateProviderService } from './shared/providers/mail-template-provider/mail-template-provider.service';
import { MailProviderModule } from './shared/providers/mail-provider/mail-provider.module';
import { JobsModule } from './shared/jobs/jobs.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    UserModule,
    AuthenticationUserModule,
    RolesModule,
    UserTokenModule,
    MailProviderModule,
    JobsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    HashProviderService,
    DiskStorageProviderService,
    MailTemplateProviderService,
  ],
})
export class AppModule {}
