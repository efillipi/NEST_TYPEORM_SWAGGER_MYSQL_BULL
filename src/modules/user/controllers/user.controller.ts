import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';
import { CreateUserSwagger } from '../swagger/CreateUser.swagger';
import { ListUserSwagger } from '../swagger/ListUser.swagger';
import { FindByIdUser } from '../swagger/FindByIdUser.swagger';
import { UpdateUserSwagger } from '../swagger/UpdateUser.swagger';
import { BadRequestSwagger } from '../../../shared/helpers/swagger/bad-request.swagger';
import { NotFoundSwagger } from '../../../shared/helpers/swagger/not-found.swagger';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({
    status: 201,
    description: 'Create new user success',
    type: CreateUserSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data',
    type: BadRequestSwagger,
  })
  async create(@Body() body: ICreateUserDTO) {
    return await this.userService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'List users' })
  @ApiResponse({
    status: 200,
    description: 'List users success',
    type: ListUserSwagger,
    isArray: true,
  })
  async find() {
    return await this.userService.find();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find user by id' })
  @ApiResponse({
    status: 200,
    description: 'Find user success',
    type: FindByIdUser,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: NotFoundSwagger,
  })
  async show(@Param('id') id: number) {
    return await this.userService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user by id' })
  @ApiResponse({
    status: 200,
    description: 'Update user success',
    type: UpdateUserSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: NotFoundSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data',
    type: BadRequestSwagger,
  })
  async update(@Param('id') id: number, @Body() body: IUpdateUserDTO) {
    return await this.userService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({ status: 204, description: 'Delete user success' })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: NotFoundSwagger,
  })
  async delete(@Param('id') id: number) {
    return await this.userService.delete(id);
  }
}
