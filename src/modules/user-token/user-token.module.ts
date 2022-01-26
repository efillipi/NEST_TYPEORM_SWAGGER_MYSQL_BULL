import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserToken from './entities/UserToken';
import { UserTokenRepositoryService } from './repositories/UserTokenRepository';
import { ListUserTokenService } from './services/list-user-token/list-user-token.service';
import { FindUserTokenByIdService } from './services/find-user-token-by-id/find-user-token-by-id.service';
import { ListTokenController } from './controllers/list-token/list-token.controller';
import { FindUserTokenByIdController } from './controllers/find-user-token-by-id/find-user-token-by-id.controller';
import User from '../user/entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([UserToken, User])],
  providers: [
    UserTokenRepositoryService,
    ListUserTokenService,
    FindUserTokenByIdService,
  ],
  controllers: [ListTokenController, FindUserTokenByIdController],
  exports: [UserTokenRepositoryService],
})
export class UserTokenModule {}
