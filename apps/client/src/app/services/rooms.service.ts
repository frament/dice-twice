import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Room, RoomAudio, RoomMainShow, roomStates } from '../../../../api/src/app/services/rooms/room';
import { FullRoomInfo } from '../../../../api/src/app/services/rooms/full-room-info';
import { User } from '../../../../api/src/app/services/user/user';
import { PlayerHero } from '../../../../api/src/app/services/heroes/hero';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private readonly http:HttpClient, private socket:SocketService) { }

  async getMyRooms(): Promise<Room[]> {
    return (await this.http.get('/api/room/myrooms')
      .toPromise()) as Room[];
  }

  getRoomInfo(id:string): Promise<FullRoomInfo>{
    return this.http.get('/api/room/fullInfo/'+ id).toPromise() as Promise<FullRoomInfo>;
  }

  async addRoom(name:string):Promise<Room> {
    return  await this.http.get('/api/room/add/'+ name).toPromise() as Promise<Room>;
  }

  async deleteRoom(id:number):Promise<void> {
     await this.http.get('/api/room/delete/'+ id).toPromise();
  }

  async setSate(id: number, state: roomStates):Promise<void>{
    await this.http.get('/api/room/set_state/'+ id+'/'+state).toPromise();
    await this.socket.emit('room_'+id, {message:'state',data:state})
  }

  async setMainShow(id: number, mainShow: RoomMainShow):Promise<void>{
    await this.http.post('/api/room/set_main_show/'+ id, mainShow).toPromise();
  }

  async setAudio(id: number, audio: RoomAudio):Promise<void>{
    await this.http.post('/api/room/set_audio/'+ id, audio).toPromise();
  }

  getRoomPlayers(id:number):Promise<Partial<User>[]>{
    return this.http.get('/api/room/players/'+ id).toPromise() as Promise<Partial<User>[]>;
  }

  getRoomPlayersHeroes(id:number):Promise<PlayerHero[]>{
    return this.http.get('/api/room/players_heroes/'+ id).toPromise() as Promise<PlayerHero[]>;
  }

  async join(id:number, uid:string): Promise<void>{
    await this.http.get('/api/room/join/'+ id+'/'+uid).toPromise();
  }
}
