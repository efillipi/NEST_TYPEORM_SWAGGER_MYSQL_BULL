import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsArray,
  ArrayMinSize,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class IRequestCreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;

  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty()
  roles: string[];
}
