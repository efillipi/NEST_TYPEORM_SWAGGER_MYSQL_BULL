import {
  Controller,
  Patch,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/shared/guards/decorators/roles.decorator';
import User from '../../entities/User';
import { UpdateAvatarService } from '../../services/update-avatar/update-avatar.service';
import uploadConfig from '../../../../shared/config/upload';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/shared/guards/role.guard';
import { ErrorRequestSwagger } from 'src/shared/helpers/swagger/error-request.swagger';

@Controller('users/avatar')
@ApiTags('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UpdateAvatarController {
  constructor(private readonly service: UpdateAvatarService) {}

  @Patch()
  @Roles('ADM', 'USER')
  @ApiOperation({ summary: 'Update user avatar' })
  @ApiResponse({
    status: 200,
    description: 'Update user avatar success',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'avatar is mandatory',
    type: ErrorRequestSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Only authentic users can change avatars',
    type: ErrorRequestSwagger,
  })
  @UseInterceptors(FileInterceptor('avatar', uploadConfig))
  async updateAvatar(
    @Req() req: Express.Request,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    return await this.service.execute({
      id_user: req.user.id,
      avatar,
    });
  }
}
