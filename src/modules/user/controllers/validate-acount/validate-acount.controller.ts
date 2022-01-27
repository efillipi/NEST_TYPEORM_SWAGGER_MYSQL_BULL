import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { BadRequestSwagger } from 'src/shared/helpers/swagger/bad-request.swagger';
import { ValidateAcountService } from '../../services/validate-acount/validate-acount.service';
import { ok, Bad_Request } from 'src/config/templateEmail';

@Controller('validate-acount')
export class ValidateAcountController {
  constructor(private readonly service: ValidateAcountService) {}

  @Get(':token')
  @ApiTags('users')
  @ApiOperation({ summary: 'Validate acount' })
  @ApiResponse({
    status: 200,
    description: 'Validate acount success',
  })
  @ApiResponse({
    status: 404,
    description: 'Invalid Token',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Expired Token',
    type: BadRequestSwagger,
  })
  async excute(@Param('token') token: string, @Res() response: Response) {
    try {
      await this.service.execute({ token });
      response.status(200).sendFile(ok);
    } catch (error) {
      response.status(400).sendFile(Bad_Request, error.response);
    }
  }
}
