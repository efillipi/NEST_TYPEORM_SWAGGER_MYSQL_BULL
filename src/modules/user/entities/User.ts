import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import Role from 'src/modules/roles/entities/Role';
import { Exclude, Expose } from 'class-transformer';
import UserToken from 'src/modules/user-token/entities/UserToken';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column({ unique: true })
  @ApiProperty()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: false })
  @ApiProperty()
  active: boolean;

  @Column({ nullable: true })
  @Exclude()
  avatar: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: string;

  @ApiProperty()
  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return `${process.env.APP_API_URL}/tmp/avatar.jpg`;
    }

    switch (process.env.STORAGE_DRIVER) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;

      default:
        return null;
    }
  }

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'users_roles',
    joinColumns: [{ name: 'id_user' }],
    inverseJoinColumns: [{ name: 'id_role' }],
  })
  @ApiProperty()
  roles: Role[];

  @OneToMany(() => UserToken, (userToken) => userToken.user)
  @JoinColumn({ name: 'id' })
  userToken: UserToken[];

  constructor(user?: Partial<User>) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.active = user.active;
    this.avatar = user.avatar;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
export default User;
