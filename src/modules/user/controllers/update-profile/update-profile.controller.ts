import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/shared/guards/decorators/roles.decorator';
import { RolesGuard } from 'src/shared/guards/role.guard';
import { BadRequestSwagger } from 'src/shared/helpers/swagger/bad-request.swagger';
import { ErrorRequestSwagger } from 'src/shared/helpers/swagger/error-request.swagger';
import IUpdateProfileDTO from '../../dtos/IUpdateProfileDTO';
import User from '../../entities/User';
import { UpdateProfileService } from '../../services/update-profile/update-profile.service';

@Controller('profile/user')
@ApiTags('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UpdateProfileController {
  constructor(private readonly service: UpdateProfileService) {}

  @Put()
  @Roles('ADM', 'USER')
  @ApiOperation({ summary: 'Update user by id' })
  @ApiResponse({
    status: 200,
    description: 'Update user success',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: ErrorRequestSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: ErrorRequestSwagger,
  })
  @ApiResponse({
    status: 409,
    description: 'Email is already being used',
    type: ErrorRequestSwagger,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async execute(@Req() req: Express.Request, @Body() body: IUpdateProfileDTO) {
    return await this.service.execute(req.user.id, body);
  }
}
