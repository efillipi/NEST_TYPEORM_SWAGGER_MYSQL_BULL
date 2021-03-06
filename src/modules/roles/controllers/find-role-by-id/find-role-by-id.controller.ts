import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/shared/guards/decorators/roles.decorator';
import { RolesGuard } from 'src/shared/guards/role.guard';
import { ErrorRequestSwagger } from 'src/shared/helpers/swagger/error-request.swagger';
import Role from '../../entities/Role';
import { FindRoleByIdService } from '../../services/find-role-by-id/find-role-by-id.service';

@Controller('roles')
@ApiTags('roles')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class FindRoleByIdController {
  constructor(private readonly service: FindRoleByIdService) {}

  @Get(':id')
  @Roles('ADM')
  @ApiOperation({ summary: 'Find role by id' })
  @ApiResponse({
    status: 200,
    description: 'Find role success',
    type: Role,
  })
  @ApiResponse({
    status: 404,
    description: 'Role not found',
    type: ErrorRequestSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: ErrorRequestSwagger,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async execute(@Param('id', new ParseIntPipe()) id: number) {
    return await this.service.execute(id);
  }
}
