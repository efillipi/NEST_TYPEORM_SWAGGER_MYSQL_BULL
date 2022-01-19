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
import { DeleteRoleService } from '../../services/delete-role/delete-role.service';

@Controller('roles')
@ApiTags('roles')
@UseGuards(AuthGuard('jwt'))
export class DeleteRoleController {
  constructor(private readonly service: DeleteRoleService) {}
  @Delete(':id')
  @ApiOperation({ summary: 'Delete role by id' })
  @ApiResponse({ status: 204, description: 'Delete role success' })
  @ApiResponse({
    status: 404,
    description: 'Role not found',
    type: NotFoundSwagger,
  })
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    return await this.service.execute(id);
  }
}
