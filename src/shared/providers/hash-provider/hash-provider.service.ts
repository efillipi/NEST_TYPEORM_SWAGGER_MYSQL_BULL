import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcryptjs';

@Injectable()
export class HashProviderService {
  public async generateHash(payload: string): Promise<string> {
    const hashPassword = await hash(payload, 8);

    return hashPassword;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    const hashPassword = await compare(payload, hashed);

    return hashPassword;
  }
}
