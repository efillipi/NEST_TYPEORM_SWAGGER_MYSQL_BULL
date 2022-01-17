import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListUsersService } from '../../services/list-users/list-users.service';
import { ListUserSwagger } from '../../swagger/ListUser.swagger';

@Controller('users')
@ApiTags('users')
export class ListUsersController {
  constructor(private readonly service: ListUsersService) {}

  @Get()
  @ApiOperation({ summary: 'List users' })
  @ApiResponse({
    status: 200,
    description: 'List users success',
    type: ListUserSwagger,
    isArray: true,
  })
  async find() {
    return await this.service.find();
  }
}
