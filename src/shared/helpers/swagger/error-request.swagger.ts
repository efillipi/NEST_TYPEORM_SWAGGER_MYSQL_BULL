import { ApiProperty } from '@nestjs/swagger';

export class ErrorRequestSwagger {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}
