import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
} from '@nestjs/websockets';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from './entitites/message.entity';
import { RoomEntity } from './entitites/room.entity';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { decode } from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private rooms: any;
  constructor(
    private userService: UserService,
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
    @InjectRepository(RoomEntity)
    private roomRepository: Repository<RoomEntity>,
  ) {}

  private connectedUsers = [];

  async handleConnection(client: Socket) {
    const { token } = client.handshake.headers;
    if (!token) {
      return;
    }
    if (typeof token === 'string') {
      const decoded: any = decode(token);
      const { username } = decoded;
      const user = await this.userService.findOneByUsername(username);
      this.connectedUsers.push({
        user,
        socketId: client.id,
      });
      this.server.emit('users', this.connectedUsers);
    }
  }

  async handleDisconnect(client: Socket) {
    const user = this.connectedUsers.find(
      (connectedUser) => connectedUser.socketId === client.id,
    );
    if (user) {
      this.connectedUsers = this.connectedUsers.filter(
        (connectedUser) => connectedUser.socketId !== client.id,
      );
      this.server.emit('users', this.connectedUsers);
    }
  }

  @SubscribeMessage('chat')
  async onChat(client: Socket, message: any) {
    const { token } = client.handshake.headers;
    if (!token) {
      return;
    }
    if (typeof token === 'string') {
      const decoded: any = decode(token);
      const { username } = decoded;
      const user = await this.userService.findOneByUsername(username);
      const roomName: string = message.room;

      const room = await this.roomRepository.findOneBy({ name: roomName });
      let roomEntity: RoomEntity;

      if (!room) {
        roomEntity = this.roomRepository.create({ name: message.room });
        await this.roomRepository.save(roomEntity);
      } else {
        roomEntity = room;
      }
      console.log('roomEntity : ', roomEntity);
      const newMessage = this.messageRepository.create({
        message: message.message,
        sentBy: user.id,
        username: user.username,
        room: roomEntity,
        roomName: roomEntity.name,
      });
      try {
        await this.messageRepository.save(newMessage);
        console.log('newMessage : ', newMessage);
      } catch (error) {
        console.log('error : ', error);
      }

      const allMessages = await this.messageRepository.find({
        where: { roomName: roomEntity.name },
      });
      const allRooms = await this.roomRepository.find();
      this.server.emit('chat', { allMessages, user, allRooms });
    }
  }

  @SubscribeMessage('createRoom')
  async onCreateRoom(client: Socket, roomName: string) {
    client.join(roomName);

    const roomEntity = await this.roomRepository.findOneBy({ name: roomName });

    if (!roomEntity) {
      const newRoom = this.roomRepository.create({ name: roomName });
      await this.roomRepository.save(newRoom);
      client.emit('roomCreated', {
        room: roomName,
        clients: this.rooms.get(roomName),
      });
    } else {
      client.emit('roomCreated', {
        room: roomName,
        clients: this.rooms.get(roomName),
      });
    }
  }

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('Websocket server initialized');
  }
}
