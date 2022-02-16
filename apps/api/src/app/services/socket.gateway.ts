import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { DataBaseService } from './data-base/data-base.service';
import { FullRoomInfo } from './rooms/full-room-info';

@WebSocketGateway(8181)
export class SocketGateway {

  constructor(private db: DataBaseService) {
  }

  @WebSocketServer() server: Server;

  @SubscribeMessage('subscribe')
  async subscribe(@ConnectedSocket() client: any, @MessageBody() room: string): Promise<void> {
    client.join(room);
    await this.send('socket_join',room);
    client.on('disconnect', async () => {
      await this.unsubscribe(client, room);
    })
  }
  @SubscribeMessage('unsubscribe')
  async unsubscribe(@ConnectedSocket() client: any, @MessageBody() room: string): Promise<void> {
    await this.send('socket_leave',room);
    client.leave(room);
  }

  @SubscribeMessage('join_room')
  async joinRoom(@ConnectedSocket() client: any, @MessageBody() room: { Id:number, idUser:number }): Promise<void> {
    const roomDb = this.db.getCollection<FullRoomInfo>('rooms').by('Id', room.Id);
    if (!roomDb) {return;}
    const isPlayer = roomDb.Players.findIndex(x=>x.playerId === room.idUser) !== -1;
    if (isPlayer){
      roomDb.Players.forEach(x=> {
        if (x.playerId === room.idUser){
          x.playerOnline = true;
          this.db.getCollection('rooms').dirty = true;
        }
      });
    }else{
      roomDb.Watchers.push(room.idUser);
    }
    await this.send('room_'+room.Id, {message:'user_joined', data:room.idUser});
    await this.send('room_'+room.Id, {message:'update_players'});
    client.on('disconnect', async () => {
      console.log('disc',room.idUser);
      if (isPlayer){
        roomDb.Players.forEach(x=> {
          if (x.playerId === room.idUser){
            x.playerOnline = false;
            this.db.getCollection('rooms').dirty = true;
          }
        });
      }else{
        roomDb.Watchers = roomDb.Watchers.filter(x=> x !== room.idUser);
      }
      await this.send('room_'+room.Id, {message:'user_leaved', data:room.idUser});
      await this.send('room_'+room.Id, {message:'update_players'});
    })
  }

  @SubscribeMessage('leave_room')
  async leaveRoom(@ConnectedSocket() client: any, @MessageBody() room: { Id:number, idUser:number }): Promise<void> {
    const roomDb = this.db.getCollection<FullRoomInfo>('rooms').by('Id', room.Id);
    if (!roomDb) {return;}
    const isPlayer = roomDb.Players.findIndex(x=>x.playerId === room.idUser) !== -1;
    if (isPlayer){
      roomDb.Players.forEach(x=> {
        if (x.playerId === room.idUser){
          x.playerOnline = false;
          this.db.getCollection('rooms').dirty = true;
        }
      });
    }else{
      roomDb.Watchers = roomDb.Watchers.filter(x=> x !== room.idUser);
    }
    await this.send('room_'+room.Id, {message:'user_leaved', data:room.idUser});
  }

  async send(message: string, data?: any) {
    this.server.to(message).emit(message, data ? data : {});
  }
}
