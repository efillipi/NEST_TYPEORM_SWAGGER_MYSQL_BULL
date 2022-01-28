import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class IForgotPasswordDTO {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;
}
