import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotFoundSwagger } from 'src/shared/helpers/swagger/not-found.swagger';
import { FindUserByidService } from '../../services/find-user-byid/find-user-byid.service';
import { FindByIdUser } from '../../swagger/FindByIdUser.swagger';

@Controller('users')
@ApiTags('users')
export class FindUserByIdController {
  constructor(private readonly service: FindUserByidService) {}

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
    return await this.service.findById(id);
  }
}
