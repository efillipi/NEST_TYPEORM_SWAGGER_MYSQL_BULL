import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestSwagger } from 'src/shared/helpers/swagger/bad-request.swagger';
import { NotFoundSwagger } from 'src/shared/helpers/swagger/not-found.swagger';
import IUpdateUserDTO from '../../dtos/IUpdateUserDTO';
import { UpdateUserService } from '../../services/update-user/update-user.service';
import { UpdateUserSwagger } from '../../swagger/UpdateUser.swagger';

@Controller('users')
@ApiTags('users')
export class UpdateUserController {
  constructor(private readonly service: UpdateUserService) {}

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
    return await this.service.update(id, body);
  }
}
