import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import IRequestCreateUserDTO from '../../dtos/IRequestCreateUserDTO';
import User from '../../entities/User';
import { CreateUserService } from '../../services/create-user/create-user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestSwagger } from 'src/shared/helpers/swagger/bad-request.swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/shared/guards/role.guard';
import { Roles } from 'src/shared/guards/decorators/roles.decorator';
import { ErrorRequestSwagger } from 'src/shared/helpers/swagger/error-request.swagger';

@Controller('users')
@ApiTags('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class CreateUserController {
  constructor(private readonly service: CreateUserService) {}

  @Post()
  @Roles('ADM')
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
    status: 400,
    description: 'Failed to send confirmation token to email',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: ErrorRequestSwagger,
  })
  @ApiResponse({
    status: 409,
    description: 'Email is already being used',
    type: ErrorRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Role or Roles not found',
    type: ErrorRequestSwagger,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async execute(@Body() body: IRequestCreateUserDTO) {
    return await this.service.execute(body);
  }
}
