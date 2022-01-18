import { Injectable } from '@nestjs/common';
import User from 'src/modules/user/entities/User';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class AuthProviderService {
  public async sing(user: User): Promise<string> {
    const token = sign({}, process.env.JWT_KEY, {
      subject: String(user.id),
      expiresIn: process.env.JWT_EXPIRESIN,
    });

    return token;
  }

  public async verify(token: string) {
    const decode = verify(token, process.env.JWT_KEY);

    return decode;
  }
}
