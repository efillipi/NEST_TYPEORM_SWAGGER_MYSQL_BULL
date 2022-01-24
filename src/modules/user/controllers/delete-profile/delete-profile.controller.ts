import { Controller, Delete, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/shared/guards/decorators/roles.decorator';
import { RolesGuard } from 'src/shared/guards/role.guard';
import { ErrorRequestSwagger } from 'src/shared/helpers/swagger/error-request.swagger';
import { DeleteProfileService } from '../../services/delete-profile/delete-profile.service';

@Controller('profile/user')
@ApiTags('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class DeleteProfileController {
  constructor(private readonly service: DeleteProfileService) {}

  @Delete()
  @Roles('ADM', 'USER')
  @ApiOperation({ summary: 'Delete profile' })
  @ApiResponse({ status: 204, description: 'Delete profile success' })
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
  async update(@Req() req: Express.Request) {
    return await this.service.execute(req.user.id);
  }
}
