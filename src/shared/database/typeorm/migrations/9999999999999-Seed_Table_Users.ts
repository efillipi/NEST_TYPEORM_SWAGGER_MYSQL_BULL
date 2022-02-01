import { hash } from 'bcryptjs';
import Role from 'src/modules/roles/entities/Role';
import User from 'src/modules/user/entities/User';
import { getRepository, MigrationInterface, Repository } from 'typeorm';
import users from './seed_info/users.seed';
import roles from './seed_info/roles.seed';

export class SeedTableUsers9999999999999 implements MigrationInterface {
  private userRepository: Repository<User> = getRepository(User);
  private roleRepository: Repository<Role> = getRepository(Role);

  public async up(): Promise<void> {
    const roleADM = await this.roleRepository.save(roles.ADM);
    const roleUSER = await this.roleRepository.save(roles.USER);

    const userAdm: any = users.ADM;
    userAdm.password = await hash(userAdm.password, 8);
    userAdm.roles = [roleADM];

    const user: any = users.USER;
    user.password = await hash(user.password, 8);
    user.roles = [roleUSER];

    await this.userRepository.save(this.userRepository.create([userAdm, user]));
  }

  public async down(): Promise<any> {
    const users = await this.userRepository.find();
    const idUsers = users.map((user) => {
      return user.id;
    });
    await this.userRepository.delete(idUsers);

    const roles = await this.roleRepository.find();
    const idRoles = roles.map((role) => {
      return role.id;
    });

    await this.roleRepository.delete(idRoles);
  }
}
