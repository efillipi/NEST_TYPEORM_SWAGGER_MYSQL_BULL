import { ApiProperty } from '@nestjs/swagger';
import User from '../entities/User';

export default class IResponseAuthenticationUserDTO {
  @ApiProperty()
  user: User;

  @ApiProperty()
  token: string;
}
