import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestSwagger } from 'src/shared/helpers/swagger/bad-request.swagger';
import { NotFoundSwagger } from 'src/shared/helpers/swagger/not-found.swagger';
import IUpdateRoleDTO from '../../dtos/IUpdateRoleDTO';
import Role from '../../entities/Role';
import { UpdateRoleService } from '../../services/update-role/update-role.service';

@Controller('roles')
@ApiTags('roles')
@UseGuards(AuthGuard('jwt'))
export class UpdateRoleController {
  constructor(private readonly service: UpdateRoleService) {}

  @Put(':id')
  @ApiOperation({ summary: 'Update role by id' })
  @ApiResponse({
    status: 200,
    description: 'Update role success',
    type: Role,
  })
  @ApiResponse({
    status: 404,
    description: 'Role not found',
    type: NotFoundSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 409,
    description: 'Role already registered',
    type: BadRequestSwagger,
  })
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: IUpdateRoleDTO,
  ) {
    return await this.service.execute(id, body);
  }
}
