import { Injectable } from '@nestjs/common';
import { DataBaseService } from '../data-base/data-base.service';
import { Room } from './room';
import { FullRoomInfo } from './full-room-info';
import { User } from '../user/user';
import { Hero, PlayerHero } from '../heroes/hero';
import { Helper } from '../../helper';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class RoomsService {
  constructor(private db:DataBaseService) {
  }

  baseDir = join(__dirname, '/./files/');

  addRoom(Name:string, Master:number): Room {
    return this.db.getCollection('rooms')
      .insert(new FullRoomInfo({Id:this.db.getNextId('rooms'), Name, Master, playerGuid: Helper.newGuid(), watcherGuid: Helper.newGuid()}));
  }

  deleteRoom(Id:number, Master:number): void {
    this.db.getCollection('rooms').removeWhere({Id, Master});
    const files = this.db.db.getCollection('files').find({room:Id,UserId:Master});
    for (const file of files){
      fs.unlinkSync(this.baseDir+ file.uid);
    }
    this.db.db.getCollection('files').removeWhere({room:Id,UserId:Master});
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

  findRoom(query:LokiQuery<FullRoomInfo & LokiObj>): FullRoomInfo[] {
    return this.db.getCollection<FullRoomInfo>('rooms').find(query);
  }

  byId(id:number): FullRoomInfo {
    return this.db.getCollection('rooms').by('Id',id);
  }

  getMyRooms(userId:number):Room[]{
    return this.db.getCollection<FullRoomInfo>('rooms').find({$or:[{Master:userId},{Players:{$contains:userId}},{Watchers:{$contains:userId}}]})
      .map(({Id,Name,state,Master})=>({Id,Name,state,Master}));
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
      result.push({hero, player, playerIsOnline:item.playerOnline});
    }
    return result;
  }


  updateRoom(Id:number, update:Partial<FullRoomInfo>):void{
    this.db.getCollection<FullRoomInfo>('rooms')
      .findAndUpdate({Id}, obj => Object.assign(obj, update));
  }

}
