import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestSwagger } from 'src/shared/helpers/swagger/bad-request.swagger';
import { ErrorRequestSwagger } from 'src/shared/helpers/swagger/error-request.swagger';
import IForgotPasswordDTO from '../../dtos/IForgotPasswordDTO ';
import { ForgotPasswordService } from '../../services/forgot-password/forgot-password.service';

@Controller('password/forgot')
@ApiTags('password')
export class ForgotPasswordController {
  constructor(private readonly service: ForgotPasswordService) {}

  @Post()
  @ApiOperation({ summary: 'Forgot Password in api' })
  @ApiResponse({
    status: 200,
    description: 'Forgot Password in api success',
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
    description: 'Authentication Failure',
    type: ErrorRequestSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Inactive user',
    type: ErrorRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: ErrorRequestSwagger,
  })
  @HttpCode(HttpStatus.OK)
  async execute(@Body() body: IForgotPasswordDTO) {
    return await this.service.execute(body);
  }
}
