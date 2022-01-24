import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class IUpdateProfileDTO {
  @IsString()
  @ApiProperty()
  @IsOptional()
  name?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  email?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  password?: string;
}
