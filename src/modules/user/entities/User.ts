import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import Role from 'src/modules/roles/entities/Role';
import { Exclude, Expose } from 'class-transformer';

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
  @ApiProperty()
  password: string;

  @Column({ nullable: true })
  @Exclude()
  @ApiProperty()
  avatar: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: string;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    return `${process.env.APP_API_URL}/files/${this.avatar}`;
  }

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'users_roles',
    joinColumns: [{ name: 'id_user' }],
    inverseJoinColumns: [{ name: 'id_role' }],
  })
  @ApiProperty()
  roles: Role[];
}
export default User;
