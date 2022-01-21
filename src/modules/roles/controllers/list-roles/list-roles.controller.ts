import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/shared/guards/decorators/roles.decorator';
import { RolesGuard } from 'src/shared/guards/role.guard';
import Role from '../../entities/Role';
import { ListRolesService } from '../../services/list-roles/list-roles.service';

@Controller('roles')
@ApiTags('roles')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ListRolesController {
  constructor(private readonly service: ListRolesService) {}

  @Get()
  // @Roles('ADM')
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
