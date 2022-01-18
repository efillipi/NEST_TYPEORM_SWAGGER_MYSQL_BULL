import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthProviderService } from 'src/shared/providers/auth-provider/auth-provider.service';
import { HashProviderService } from 'src/shared/providers/hash-provider/hash-provider.service';
import { UserModule } from '../user/user.module';
import { AuthenticationUserController } from './controllers/authentication-user/authentication-user.controller';
import { AuthenticationUserService } from './services/authentication-user/authentication-user.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/LocalStrategy';

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
  providers: [
    AuthenticationUserService,
    HashProviderService,
    LocalStrategy,
    JwtStrategy,
    AuthProviderService,
  ],
})
export class AuthenticationUserModule {}
