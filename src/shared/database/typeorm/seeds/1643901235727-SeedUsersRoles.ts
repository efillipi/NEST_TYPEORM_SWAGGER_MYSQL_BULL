import { hash } from 'bcryptjs';
import Role from 'src/modules/roles/entities/Role';
import User from 'src/modules/user/entities/User';
import { createConnection, MigrationInterface } from 'typeorm';
import users from './seed_info/users.seed';
import roles from './seed_info/roles.seed';

export class SeedUsersRoles1643901235727 implements MigrationInterface {
  public async up(): Promise<void> {
    const connection = await createConnection();

    const roleRepository = connection.getRepository(Role);
    const userRepository = connection.getRepository(User);

    const roleADM = await roleRepository.save(roles.ADM);
    const roleUSER = await roleRepository.save(roles.USER);

    const userAdm: any = users.ADM;
    userAdm.password = await hash(userAdm.password, 8);
    userAdm.roles = [roleADM];

    const user: any = users.USER;
    user.password = await hash(user.password, 8);
    user.roles = [roleUSER];

    await userRepository.save(userRepository.create([userAdm, user]));

    connection.close();
  }

  public async down(): Promise<any> {
    const connection = await createConnection();

    const roleRepository = connection.getRepository(Role);
    const userRepository = connection.getRepository(User);
    const users = await userRepository.find();
    const idUsers = users.map((user) => {
      return user.id;
    });
    await userRepository.delete(idUsers);

    const roles = await roleRepository.find();
    const idRoles = roles.map((role) => {
      return role.id;
    });

    await roleRepository.delete(idRoles);
    connection.close();
  }
}
