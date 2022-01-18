import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { UserModule } from './modules/user/user.module';
import { HashProviderService } from './shared/providers/hash-provider/hash-provider.service';
import { AuthProviderService } from './shared/providers/auth-provider/auth-provider.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    UserModule,
  ],
  providers: [HashProviderService, AuthProviderService],
})
export class AppModule {}
