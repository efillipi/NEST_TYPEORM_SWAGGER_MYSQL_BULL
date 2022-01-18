import { Body, Controller, Param, ParseIntPipe, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestSwagger } from 'src/shared/helpers/swagger/bad-request.swagger';
import { NotFoundSwagger } from 'src/shared/helpers/swagger/not-found.swagger';
import IUpdateUserDTO from '../../dtos/IUpdateUserDTO';
import User from '../../entities/User';
import { UpdateUserService } from '../../services/update-user/update-user.service';

@Controller('users')
@ApiTags('users')
export class UpdateUserController {
  constructor(private readonly service: UpdateUserService) {}

  @Put(':id')
  @ApiOperation({ summary: 'Update user by id' })
  @ApiResponse({
    status: 200,
    description: 'Update user success',
    type: User,
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
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: IUpdateUserDTO,
  ) {
    return await this.service.update(id, body);
  }
}
