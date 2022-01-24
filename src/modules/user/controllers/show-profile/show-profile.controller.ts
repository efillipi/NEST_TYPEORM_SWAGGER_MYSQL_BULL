import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/shared/guards/decorators/roles.decorator';
import { RolesGuard } from 'src/shared/guards/role.guard';
import { ErrorRequestSwagger } from 'src/shared/helpers/swagger/error-request.swagger';
import User from '../../entities/User';
import { ShowProfileService } from '../../services/show-profile/show-profile.service';

@Controller('profile/user')
@ApiTags('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ShowProfileController {
  constructor(private readonly service: ShowProfileService) {}

  @Get()
  @Roles('ADM', 'USER')
  @ApiOperation({ summary: 'Show Profile' })
  @ApiResponse({
    status: 200,
    description: 'Show Profile success',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: ErrorRequestSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: ErrorRequestSwagger,
  })
  async show(@Req() req: Express.Request) {
    return await this.service.execute({
      userId: req.user.id,
    });
  }
}
