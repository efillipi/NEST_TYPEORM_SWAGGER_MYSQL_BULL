import { ApiProperty } from '@nestjs/swagger';
import User from 'src/modules/user/entities/User';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('user_token')
class UserToken {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty()
  @Column()
  token: string;

  @ApiProperty()
  @Column()
  type: string;

  @ApiProperty()
  @Column()
  id_user: number;

  @ApiProperty()
  @Column({ default: false })
  active: boolean;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.userToken)
  @JoinColumn({ name: 'id_user' })
  user: User;
}

export default UserToken;
