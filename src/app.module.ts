import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { UserModule } from './modules/user/user.module';
import { HashProviderService } from './shared/providers/hash-provider/hash-provider.service';
import { AuthenticationUserModule } from './modules/authentication-user/authentication-user.module';
import { RolesModule } from './modules/roles/roles.module';
import { DiskStorageProviderService } from './shared/providers/disk-storage-provider/disk-storage-provider.service';
import { UserTokenModule } from './modules/user-token/user-token.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    UserModule,
    AuthenticationUserModule,
    RolesModule,
    UserTokenModule,
  ],
  providers: [HashProviderService, DiskStorageProviderService],
})
export class AppModule {}
