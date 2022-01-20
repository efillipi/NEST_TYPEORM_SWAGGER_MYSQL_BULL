import Role from 'src/modules/roles/entities/Role';

export default class ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  roles: Role[];
}
