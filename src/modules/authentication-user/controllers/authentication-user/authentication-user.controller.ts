import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestSwagger } from 'src/shared/helpers/swagger/bad-request.swagger';
import IRequestAuthenticationUserDTO from '../../dtos/IRequestAuthenticationUserDTO';
import IResponseAuthenticationUserDTO from '../../dtos/IResponseAuthenticationUserDTO';

@Controller('sessions')
@ApiTags('sessions')
export class AuthenticationUserController {
  @UseGuards(AuthGuard('local'))
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
  async login(@Req() req: any, @Body() body: IRequestAuthenticationUserDTO) {
    return req.user;
  }
}
