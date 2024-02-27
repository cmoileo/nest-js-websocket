import { TimestampEntites } from '../../Generic/timestamp.entites';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { RoomEntity } from './room.entity';

@Entity('message')
export class MessageEntity extends TimestampEntites {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ManyToOne(() => UserEntity, (user) => user.id)
  sentBy: number;

  @Column()
  username: string;

  @Column()
  message: string;

  @Column({ nullable: true })
  roomName: string;

  @ManyToOne(() => RoomEntity, (room) => room.messages, { nullable: true })
  room: RoomEntity;
}
