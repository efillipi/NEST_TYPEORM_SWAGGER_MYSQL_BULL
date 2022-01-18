import { ApiProperty } from '@nestjs/swagger';
import User from '../../user/entities/User';

export default class IResponseAuthenticationUserDTO {
  @ApiProperty()
  user: User;

  @ApiProperty()
  token: string;
}
