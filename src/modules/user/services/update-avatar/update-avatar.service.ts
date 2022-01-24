import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { DiskStorageProviderService } from 'src/shared/providers/disk-storage-provider/disk-storage-provider.service';
import User from '../../entities/User';
import { UserRepositoryService } from '../../repositories/UserRepository';

interface IRequest {
  id_user: number;
  avatar: Express.Multer.File;
}

@Injectable()
export class UpdateAvatarService {
  constructor(
    private usersRepository: UserRepositoryService,

    private storageProvider: DiskStorageProviderService,
  ) {}
  public async execute({ id_user, avatar }: IRequest): Promise<User> {
    if (!avatar) {
      throw new BadRequestException('avatar is mandatory');
    }
    const user = await this.usersRepository.findSomething({ id: id_user });

    if (!user) {
      await this.storageProvider.clearTmp(avatar.filename);
      throw new UnauthorizedException(
        'Only authentic users can change avatars',
      );
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatar.filename);

    user.avatar = filename;

    await this.usersRepository.save(user);

    return user;
  }
}
