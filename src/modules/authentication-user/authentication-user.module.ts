import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { HashProviderService } from 'src/shared/providers/hash-provider/hash-provider.service';
import { UserModule } from '../user/user.module';
import { AuthenticationUserController } from './controllers/authentication-user/authentication-user.controller';
import { AuthenticationUserService } from './services/authentication-user/authentication-user.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    PassportModule,
    JwtModule.register({
      privateKey: process.env.JWT_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRESIN },
    }),
  ],
  controllers: [AuthenticationUserController],
  providers: [AuthenticationUserService, HashProviderService, JwtStrategy],
})
export class AuthenticationUserModule {}
