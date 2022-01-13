import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class SocketGateway {

  @WebSocketServer() server: Server;

  @SubscribeMessage('subscribe')
  async subscribe(@ConnectedSocket() client: any, @MessageBody() room: string): Promise<void> {
    client.join(room);
  }
  @SubscribeMessage('unsubscribe')
  async unsubscribe(@ConnectedSocket() client: any, @MessageBody() room: string): Promise<void> { client.leave(room); }

  async send(message: string, data?: any) {
    this.server.to(message).emit(message, data ? data : {});
  }
}
