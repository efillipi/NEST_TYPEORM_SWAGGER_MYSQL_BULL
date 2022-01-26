import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/shared/guards/decorators/roles.decorator';
import { RolesGuard } from 'src/shared/guards/role.guard';
import { ErrorRequestSwagger } from 'src/shared/helpers/swagger/error-request.swagger';
import UserToken from '../../entities/UserToken';
import { ListUserTokenService } from '../../services/list-user-token/list-user-token.service';

@Controller('tokens')
@ApiTags('tokens')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ListTokenController {
  constructor(private readonly service: ListUserTokenService) {}
  @Get()
  @Roles('ADM')
  @ApiOperation({ summary: 'List user token' })
  @ApiResponse({
    status: 200,
    description: 'List user token success',
    type: UserToken,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: ErrorRequestSwagger,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async execute() {
    return await this.service.execute();
  }
}
