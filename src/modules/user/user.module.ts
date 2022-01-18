import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entities/User';
import { CreateUserController } from './controllers/create-user/create-user.controller';
import { CreateUserService } from './services/create-user/create-user.service';
import { ListUsersService } from './services/list-users/list-users.service';
import { ListUsersController } from './controllers/list-users/list-users.controller';
import { FindUserByidService } from './services/find-user-byid/find-user-byid.service';
import { UpdateUserService } from './services/update-user/update-user.service';
import { DeleteUserService } from './services/delete-user/delete-user.service';
import { FindUserByIdController } from './controllers/find-user-by-id/find-user-by-id.controller';
import { UpdateUserController } from './controllers/update-user/update-user.controller';
import { DeleteUserController } from './controllers/delete-user/delete-user.controller';
import { HashProviderService } from 'src/shared/providers/hash-provider/hash-provider.service';
import { AuthenticationUserService } from './services/authentication-user/authentication-user.service';
import { AuthenticationUserController } from './controllers/authentication-user/authentication-user.controller';
import { AuthProviderService } from 'src/shared/providers/auth-provider/auth-provider.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [
    CreateUserController,
    ListUsersController,
    FindUserByIdController,
    UpdateUserController,
    DeleteUserController,
    AuthenticationUserController,
  ],
  providers: [
    CreateUserService,
    ListUsersService,
    FindUserByidService,
    UpdateUserService,
    DeleteUserService,
    HashProviderService,
    AuthenticationUserService,
    AuthProviderService,
  ],
  exports: [
    CreateUserService,
    ListUsersService,
    FindUserByidService,
    UpdateUserService,
    DeleteUserService,
  ],
})
export class UserModule {}
