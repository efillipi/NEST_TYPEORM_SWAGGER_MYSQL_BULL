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
import { Roles } from 'src/shared/guards/decorators/roles.decorator';
import { RolesGuard } from 'src/shared/guards/role.guard';
import { BadRequestSwagger } from 'src/shared/helpers/swagger/bad-request.swagger';
import { ErrorRequestSwagger } from 'src/shared/helpers/swagger/error-request.swagger';
import IUpdateUserDTO from '../../dtos/IUpdateUserDTO';
import User from '../../entities/User';
import { UpdateUserService } from '../../services/update-user/update-user.service';

@Controller('users')
@ApiTags('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UpdateUserController {
  constructor(private readonly service: UpdateUserService) {}

  @Put(':id')
  @Roles('ADM')
  @ApiOperation({ summary: 'Update user by id' })
  @ApiResponse({
    status: 200,
    description: 'Update user success',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: ErrorRequestSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data',
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
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: IUpdateUserDTO,
  ) {
    return await this.service.execute(id, body);
  }
}
