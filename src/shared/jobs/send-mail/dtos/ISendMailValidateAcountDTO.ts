import User from 'src/modules/user/entities/User';

export default interface ISendMailValidateAcountDTO {
  user?: User;
  token?: string;
}
