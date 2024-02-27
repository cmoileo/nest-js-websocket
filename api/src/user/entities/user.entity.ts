import { ROLES_ENUM } from 'src/types/user/user';
import { TimestampEntites } from '../../Generic/timestamp.entites';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity extends TimestampEntites {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;
}
