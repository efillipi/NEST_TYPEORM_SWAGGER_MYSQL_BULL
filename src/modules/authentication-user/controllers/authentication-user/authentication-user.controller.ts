import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestSwagger } from 'src/shared/helpers/swagger/bad-request.swagger';
import { ErrorRequestSwagger } from 'src/shared/helpers/swagger/error-request.swagger';
import IRequestAuthenticationUserDTO from '../../dtos/IRequestAuthenticationUserDTO';
import IResponseAuthenticationUserDTO from '../../dtos/IResponseAuthenticationUserDTO';
import { AuthenticationUserService } from '../../services/authentication-user/authentication-user.service';

@Controller('sessions')
@ApiTags('sessions')
export class AuthenticationUserController {
  constructor(
    private readonly authenticationUserService: AuthenticationUserService,
  ) {}

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
    type: ErrorRequestSwagger,
  })
  async login(@Body() body: IRequestAuthenticationUserDTO) {
    return await this.authenticationUserService.validateUser(body);
  }
}
