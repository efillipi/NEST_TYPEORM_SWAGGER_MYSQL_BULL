import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/shared/guards/decorators/roles.decorator';
import { RolesGuard } from 'src/shared/guards/role.guard';
import User from '../../entities/User';
import { ListUsersService } from '../../services/list-users/list-users.service';

@Controller('users')
@ApiTags('users')
// token, permissao
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ListUsersController {
  constructor(private readonly service: ListUsersService) {}

  @Get()
  @Roles('ADM', 'USER')
  @ApiOperation({ summary: 'List users' })
  @ApiResponse({
    status: 200,
    description: 'List users success',
    type: User,
    isArray: true,
  })
  async find() {
    return await this.service.execute();
  }
}
