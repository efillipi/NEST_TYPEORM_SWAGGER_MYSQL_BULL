import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestSwagger } from 'src/shared/helpers/swagger/bad-request.swagger';
import IRequestAuthenticationUserDTO from '../../dtos/IRequestAuthenticationUserDTO';
import IResponseAuthenticationUserDTO from '../../dtos/IResponseAuthenticationUserDTO';
import { AuthenticationUserService } from '../../services/authentication-user/authentication-user.service';

@Controller('sessions')
@ApiTags('users')
export class AuthenticationUserController {
  constructor(private readonly service: AuthenticationUserService) {}
  @Post()
  @ApiOperation({ summary: 'login in api' })
  @ApiResponse({
    status: 200,
    description: 'Login in api success',
    type: IResponseAuthenticationUserDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Authentication Failure',
    type: BadRequestSwagger,
  })
  async execute(@Body() body: IRequestAuthenticationUserDTO) {
    return await this.service.execute(body);
  }
}
