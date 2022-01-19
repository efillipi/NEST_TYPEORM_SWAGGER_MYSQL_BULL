import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import Role from '../../entities/Role';
import { ListRolesService } from '../../services/list-roles/list-roles.service';

@Controller('roles')
@ApiTags('roles')
@UseGuards(AuthGuard('jwt'))
export class ListRolesController {
  constructor(private readonly service: ListRolesService) {}
  @Get()
  @ApiOperation({ summary: 'List roles' })
  @ApiResponse({
    status: 200,
    description: 'List roles success',
    type: Role,
    isArray: true,
  })
  async delete() {
    return await this.service.execute();
  }
}
