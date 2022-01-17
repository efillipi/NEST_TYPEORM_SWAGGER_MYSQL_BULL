import { Controller, Delete, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotFoundSwagger } from 'src/shared/helpers/swagger/not-found.swagger';
import { DeleteUserService } from '../../services/delete-user/delete-user.service';

@Controller('users')
@ApiTags('users')
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
  async delete(@Param('id') id: number) {
    return await this.service.delete(id);
  }
}
