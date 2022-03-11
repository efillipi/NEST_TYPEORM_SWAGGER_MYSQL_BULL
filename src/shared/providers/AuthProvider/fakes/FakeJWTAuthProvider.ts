/* eslint-disable @typescript-eslint/ban-types */

import User from 'src/modules/user/entities/User';

class FakeJWTAuthProvider {
  public async sign(_payload: User): Promise<string> {
    const token = 'UHOID*(sa7ffs70saf79faynf7fnyn0y8FFSYFSYFY&FNAY&F&Y&FYS';

    return token;
  }

  public async verify(_payload: string): Promise<string | object> {
    const response = true;
    return { response };
  }
}
export default FakeJWTAuthProvider;
