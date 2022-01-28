import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestSwagger } from 'src/shared/helpers/swagger/bad-request.swagger';
import { ErrorRequestSwagger } from 'src/shared/helpers/swagger/error-request.swagger';
import IResetPasswordDTO from '../../dtos/IResetPasswordDTO';
import { ResetPasswordService } from '../../services/reset-password/reset-password.service';

@Controller('password/reset')
@ApiTags('password')
export class ResetPasswordController {
  constructor(private readonly service: ResetPasswordService) {}

  @Post()
  @ApiOperation({ summary: 'Reset Password in api' })
  @ApiResponse({
    status: 204,
    description: 'Reset Password in api success',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Invalid Token',
    type: ErrorRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Expired Token',
    type: ErrorRequestSwagger,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async execute(@Body() body: IResetPasswordDTO) {
    return await this.service.execute(body);
  }
}
