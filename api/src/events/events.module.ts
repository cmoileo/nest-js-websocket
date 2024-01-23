import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {MessageEntity} from "./entitites/message.entity";

@Module({
  imports: [AuthModule, UserModule, TypeOrmModule.forFeature([MessageEntity])],
  providers: [EventsGateway],
})
export class EventsModule {}
