import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateUserService } from '../../services/create-user/create-user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestSwagger } from 'src/shared/helpers/swagger/bad-request.swagger';
import User from '../../entities/User';
import { AuthGuard } from '@nestjs/passport';
import IRequestCreateUserDTO from '../../dtos/IRequestCreateUserDTO';

@Controller('users')
@ApiTags('users')
@UseGuards(AuthGuard('jwt'))
export class CreateUserController {
  constructor(private readonly service: CreateUserService) {}
  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({
    status: 201,
    description: 'Create new user success',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 409,
    description: 'Email is already being used',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Role or Roles not found',
    type: BadRequestSwagger,
  })
  async create(@Body() body: IRequestCreateUserDTO) {
    return await this.service.execute(body);
  }
}
