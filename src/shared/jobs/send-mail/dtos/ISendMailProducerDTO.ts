import User from 'src/modules/user/entities/User';

export default interface ISendMailProducerDTO {
  user?: User;
  token?: string;
}
