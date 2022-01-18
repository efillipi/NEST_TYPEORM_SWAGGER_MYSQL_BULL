import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import User from '../../entities/User';
import { ListUsersService } from '../../services/list-users/list-users.service';

@Controller('users')
@ApiTags('users')
@UseGuards(AuthGuard('jwt'))
export class ListUsersController {
  constructor(private readonly service: ListUsersService) {}

  @Get()
  @ApiOperation({ summary: 'List users' })
  @ApiResponse({
    status: 200,
    description: 'List users success',
    type: User,
    isArray: true,
  })
  async find() {
    return await this.service.find();
  }
}
