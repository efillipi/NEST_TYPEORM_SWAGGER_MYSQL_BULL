import {
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/shared/guards/decorators/roles.decorator';
import { RolesGuard } from 'src/shared/guards/role.guard';
import { ErrorRequestSwagger } from 'src/shared/helpers/swagger/error-request.swagger';
import { DeleteUserService } from '../../services/delete-user/delete-user.service';

@Controller('users')
@ApiTags('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class DeleteUserController {
  constructor(private readonly service: DeleteUserService) {}

  @Delete(':id')
  @Roles('ADM')
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({ status: 204, description: 'Delete user success' })
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
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    return await this.service.execute(id);
  }
}
