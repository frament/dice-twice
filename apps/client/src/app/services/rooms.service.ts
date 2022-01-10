import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Room } from '../../../../api/src/app/services/rooms/room';
import { UserService } from './user.service';
import { FullRoomInfo, roomStates } from '../../../../api/src/app/services/rooms/full-room-info';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private readonly http:HttpClient) { }

  myRooms: { Master:Room[], Player:Room[], Watcher:Room[]} | undefined;

  async loadMyRooms(): Promise<void> {
    this.myRooms = (await this.http.get('/api/room/myrooms')
      .toPromise()) as { Master: Room[], Player: Room[], Watcher: Room[]};
  }

  getRoomInfo(id:string): Promise<FullRoomInfo>{
    return this.http.get('/api/room/fullInfo/'+ id).toPromise() as Promise<FullRoomInfo>;
  }

  async addRoom(name:string):Promise<Room> {
    const result = await this.http.get('/api/room/add/'+ name).toPromise() as Promise<Room>;
    await this.loadMyRooms();
    return result;
  }

  async deleteRoom(id:number):Promise<void> {
     await this.http.get('/api/room/delete/'+ id).toPromise();
     await this.loadMyRooms();
  }

  async setSate(id: number, state: roomStates):Promise<void>{
    await this.http.get('/api/room/set_state/'+ id+'/'+state).toPromise();
    await this.loadMyRooms();
  }
}
