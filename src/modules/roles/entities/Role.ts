import { ApiProperty } from '@nestjs/swagger';
import User from 'src/modules/user/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('roles')
class Role {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  name: string;

  @ApiProperty()
  @Column()
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: string;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'users_roles',
    joinColumns: [{ name: 'id_role' }],
    inverseJoinColumns: [{ name: 'id_user' }],
  })
  @ApiProperty()
  users: User[];
}

export default Role;
