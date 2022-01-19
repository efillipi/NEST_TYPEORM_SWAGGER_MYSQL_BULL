import {
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotFoundSwagger } from 'src/shared/helpers/swagger/not-found.swagger';
import { DeleteUserService } from '../../services/delete-user/delete-user.service';

@Controller('users')
@ApiTags('users')
@UseGuards(AuthGuard('jwt'))
export class DeleteUserController {
  constructor(private readonly service: DeleteUserService) {}
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({ status: 204, description: 'Delete user success' })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: NotFoundSwagger,
  })
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    return await this.service.execute(id);
  }
}
