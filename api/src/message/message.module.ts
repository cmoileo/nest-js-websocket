import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessageEntity } from '../events/entitites/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [MessageController],
  providers: [MessageService],
  imports: [TypeOrmModule.forFeature([MessageEntity])],
})
export class MessageModule {}
