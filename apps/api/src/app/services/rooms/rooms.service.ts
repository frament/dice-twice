import { Injectable } from '@nestjs/common';
import { DataBaseService } from '../data-base/data-base.service';
import { Room } from './room';

@Injectable()
export class RoomsService {
  constructor(private db:DataBaseService) {
  }

  addRoom(Name:string, Master:number): Room {
    return this.db.db.getCollection('rooms')
      .insert(new Room({Id:this.db.getNextId('rooms'), Name, Master}));
  }

  deleteRoom(Id:number, Master:number): void {
    console.log({Id, Master});
    console.log(this.db.db.getCollection('rooms').data);
    return this.db.db.getCollection('rooms').removeWhere({Id, Master})
  }

  addPlayerToRoom(idRoom:number, idUser: number):void{
    const room = this.db.db.getCollection('rooms').by('Id',idRoom);
    room.Players.push(idUser)
  }

  addWatcherToRoom(idRoom:number, idUser: number):void{
    const room = this.db.db.getCollection('rooms').by('Id',idRoom);
    room.Watchers.push(idUser)
  }

  addHeroToRoom(idRoom:number, idHero: number):void{
    const room = this.db.db.getCollection('rooms').by('Id',idRoom);
    room.Heroes.push(idHero)
  }

  getMyRooms(userId:number){
    return {
      Master: this.db.db.getCollection<Room>('rooms').find({Master:userId}),
      Player: this.db.db.getCollection<Room>('rooms').find({Players:{$contains:userId}}),
      Watcher: this.db.db.getCollection<Room>('rooms').find({Watchers:{$contains:userId}})
    }
  }

}
