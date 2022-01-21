import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { UserModule } from './modules/user/user.module';
import { HashProviderService } from './shared/providers/hash-provider/hash-provider.service';
import { AuthenticationUserModule } from './modules/authentication-user/authentication-user.module';
import { RolesModule } from './modules/roles/roles.module';

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
    // RolesModule,
  ],
  providers: [HashProviderService],
})
export class AppModule {}
