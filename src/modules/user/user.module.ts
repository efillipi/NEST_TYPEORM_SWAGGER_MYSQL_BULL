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
import { UserRepositoryService } from './repositories/UserRepository';
import { RolesModule } from '../roles/roles.module';
import { UpdateAvatarService } from './services/update-avatar/update-avatar.service';
import { DiskStorageProviderService } from 'src/shared/providers/disk-storage-provider/disk-storage-provider.service';
import { UpdateAvatarController } from './controllers/update-avatar/update-avatar.controller';
import { ShowProfileController } from './controllers/show-profile/show-profile.controller';
import { ShowProfileService } from './services/show-profile/show-profile.service';
import { UpdateProfileService } from './services/update-profile/update-profile.service';
import { UpdateProfileController } from './controllers/update-profile/update-profile.controller';
import { DeleteProfileController } from './controllers/delete-profile/delete-profile.controller';
import { DeleteProfileService } from './services/delete-profile/delete-profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RolesModule],
  controllers: [
    CreateUserController,
    ListUsersController,
    FindUserByIdController,
    UpdateUserController,
    DeleteUserController,
    UpdateAvatarController,
    ShowProfileController,
    UpdateProfileController,
    DeleteProfileController,
  ],
  providers: [
    CreateUserService,
    ListUsersService,
    FindUserByidService,
    UpdateUserService,
    DeleteUserService,
    HashProviderService,
    UserRepositoryService,
    UpdateAvatarService,
    DiskStorageProviderService,
    ShowProfileService,
    UpdateProfileService,
    DeleteProfileService,
  ],
  exports: [UserRepositoryService],
})
export class UserModule {}
