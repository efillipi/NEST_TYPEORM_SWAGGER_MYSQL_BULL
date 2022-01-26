import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/shared/guards/decorators/roles.decorator';
import { RolesGuard } from 'src/shared/guards/role.guard';
import { ErrorRequestSwagger } from 'src/shared/helpers/swagger/error-request.swagger';
import UserToken from '../../entities/UserToken';
import { FindUserTokenByIdService } from '../../services/find-user-token-by-id/find-user-token-by-id.service';

@Controller('tokens')
@ApiTags('tokens')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class FindUserTokenByIdController {
  constructor(private readonly service: FindUserTokenByIdService) {}

  @Get(':id')
  @Roles('ADM', 'USER')
  @ApiOperation({ summary: 'Find user token by id' })
  @ApiResponse({
    status: 200,
    description: 'Find user token success',
    type: UserToken,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: ErrorRequestSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: ErrorRequestSwagger,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async excute(@Param('id', new ParseIntPipe()) id: number) {
    return await this.service.execute(id);
  }
}
