import User from 'src/modules/user/entities/User';
import { getRepository, MigrationInterface, Repository } from 'typeorm';
import users from './seed_info/users.seed';

export class SeedTableUsers1642512983561 implements MigrationInterface {
  private userRepository: Repository<User> = getRepository(User);

  public async up(): Promise<void> {
    const user: any = users;
    await this.userRepository.save(user);
  }

  public async down(): Promise<any> {
    const { id } = await this.userRepository.findOne({
      where: { email: users.email },
    });
    await this.userRepository.delete(id);
  }
}
