import { Injectable } from '@nestjs/common';
import { DataBaseService } from '../data-base/data-base.service';
import { Room } from './room';
import { FullRoomInfo } from './full-room-info';
import { User } from '../user/user';
import { Hero, PlayerHero } from '../heroes/hero';

@Injectable()
export class RoomsService {
  constructor(private db:DataBaseService) {
  }

  addRoom(Name:string, Master:number): Room {
    return this.db.getCollection('rooms')
      .insert(new FullRoomInfo({Id:this.db.getNextId('rooms'), Name, Master}));
  }

  deleteRoom(Id:number, Master:number): void {
    return this.db.getCollection('rooms').removeWhere({Id, Master})
  }

  addPlayerToRoom(idRoom:number, idUser: number):void{
    const room = this.db.db.getCollection('rooms').by('Id',idRoom);
    room.Players.push(idUser)
  }

  addWatcherToRoom(idRoom:number, idUser: number):void{
    const room = this.db.getCollection('rooms').by('Id',idRoom);
    room.Watchers.push(idUser)
  }

  addHeroToRoom(idRoom:number, idHero: number):void{
    const room = this.db.getCollection('rooms').by('Id',idRoom);
    room.Heroes.push(idHero)
  }

  getMyRooms(userId:number){
    return {
      Master: this.db.getCollection<FullRoomInfo>('rooms').find({Master:userId})
        .map(({Id,Name,state})=>({Id,Name,state})),
      Player: this.db.getCollection<FullRoomInfo>('rooms').find({Players:{$contains:userId}})
        .map(({Id,Name,state})=>({Id,Name,state})),
      Watcher: this.db.getCollection<FullRoomInfo>('rooms').find({Watchers:{$contains:userId}})
        .map(({Id,Name,state})=>({Id,Name,state})),
    }
  }

  getRoomInfo(Id:number): FullRoomInfo {
    return this.db.getCollection<FullRoomInfo>('rooms').by('Id', Id);
  }

  getRoomPlayers(Id:number): Partial<User>[] {
    const ids = this.db.getCollection<FullRoomInfo>('rooms').by('Id', Id)?.Players ?? [];
    return this.db.getCollection('users').find({Id:{$in:ids}}).map(({Id,Name})=>({Id,Name}));
  }

  getRoomPlayersHeroes(Id:number):PlayerHero[] {
    const items = this.db.getCollection<FullRoomInfo>('rooms').by('Id', Id)?.Players ?? [];
    const users = this.db.getCollection<User>('users');
    const heroes = this.db.getCollection<Hero>('heroes');
    const result:PlayerHero[] = [];
    for (const item of items){
      const {Password, ...player} = users.by('Id', item.playerId);
      const hero = heroes.by('Id', item.heroId);
      result.push({hero, player});
    }
    return result;
  }


  updateRoom(Id:number, update:Partial<FullRoomInfo>):void{
    this.db.getCollection<FullRoomInfo>('rooms')
      .findAndUpdate({Id}, obj => Object.assign(obj, update));
  }

}
