import { MessageEntity } from '../events/entitites/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [MessageController],
  providers: [MessageService],
  imports: [TypeOrmModule.forFeature([MessageEntity])],
})
export class MessageModule {}
