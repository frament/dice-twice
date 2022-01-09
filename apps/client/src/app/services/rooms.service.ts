import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Room } from '../../../../api/src/app/services/rooms/room';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private readonly http:HttpClient, private readonly user:UserService) { }

  myRooms: { Master:Room[], Player:Room[], Watcher:Room[]} | undefined;

  async loadMyRooms(): Promise<void> {
    this.myRooms = await (await this.http.get('/api/room/myrooms',
      { headers: new HttpHeaders().append('Authorization', 'Bearer ' + this.user.token) })
      .toPromise() as Promise<{ Master: Room[], Player: Room[], Watcher: Room[] }>);
  }

  async addRoom(name:string):Promise<Room> {
    const result = await this.http.get('/api/room/add/'+ name,
      {headers: new HttpHeaders().append('Authorization', 'Bearer '+this.user.token) })
      .toPromise() as Promise<Room>;
    await this.loadMyRooms();
    return result;
  }

  async deleteRoom(id:number):Promise<void> {
     await this.http.get('/api/room/delete/'+ id,
      {headers: new HttpHeaders().append('Authorization', 'Bearer '+this.user.token) })
      .toPromise();
     await this.loadMyRooms();
  }
}
