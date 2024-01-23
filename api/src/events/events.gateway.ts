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
  constructor(
    private userService: UserService,
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
  ) {}
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

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
      // await this.connectedUsersService.create({ socketId: client.id, user });
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
      // await this.connectedUsersService.delete(user.id);
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
      const newMessage = await this.messageRepository.save({
        message: message.message,
        sentBy: user.id,
        username: username
      });
      const allMessages = await this.messageRepository.find();
      this.server.emit('chat', { allMessages, user });
    }
  }
  afterInit(server: Server) {
    this.logger.log('Websocket server initialized');
  }
}
