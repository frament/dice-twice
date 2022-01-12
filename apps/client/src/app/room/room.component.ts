import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomsService } from '../services/rooms.service';
import { FullRoomInfo, roomStates } from '../../../../api/src/app/services/rooms/full-room-info';
import { UserService } from '../services/user.service';
import { User } from '../../../../api/src/app/services/user/user';
import { Hero } from '../../../../api/src/app/services/heroes/hero';
import { AddRoomDialogComponent } from '../master/add-room-dialog/add-room-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { InviteDialogComponent } from './invite-dialog/invite-dialog.component';

@Component({
  selector: 'dice-twice-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  constructor(private route:ActivatedRoute,
              private room:RoomsService,
              public user:UserService,
              public dialog: MatDialog) { }

  currentID:string = '';
  roomInfo:FullRoomInfo|undefined;
  masterMode:boolean = false;
  playerMode:boolean = false;
  watchMode:boolean = false;

  players:Partial<User>[] = [];
  heroes:Partial<Hero>[] = [];

  ngOnInit(): void {
    this.route.params.subscribe(async (params:any) => {
      if (params?.id && params.id !== this.currentID) {
        this.currentID = params.id;
        await this.updateRoom();
      }
    });
  }

  invitePlayer(){
    const dialogRef = this.dialog.open(InviteDialogComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  selectPlayer(player:Partial<User>){

  }

  selectHero(hero:Partial<Hero>){

  }

  async setRoomState(state:roomStates):Promise<void>{
    if (this.currentID){
      await this.room.setSate(parseInt(this.currentID,10), state);
      await this.updateRoom();
    }
  }

  async updateRoom(): Promise<void>{
    if (this.currentID){
      this.roomInfo = await this.room.getRoomInfo(this.currentID);
      this.updateMode();
    }
  }

  updateMode():void{
    if (this.roomInfo && this.user.currentUser){
      this.masterMode = this.roomInfo?.Master === this.user.currentUser?.userId
      this.playerMode = this.roomInfo?.Players.indexOf(this.user.currentUser?.userId) !==-1;
      this.watchMode = this.roomInfo?.Watchers.indexOf(this.user.currentUser?.userId) !==-1;
    } else {
      this.playerMode = false;
      this.masterMode = false;
      this.watchMode = false;
    }
  }

  async updatePlayers():Promise<void>{
    if (this.roomInfo?.Id !== undefined){
      this.players = await this.room.getRoomPlayers(this.roomInfo?.Id);
    }
  }

  async updateHeroes():Promise<void>{
    if (this.roomInfo?.Id !== undefined){
      this.heroes = await this.room.getRoomHeroes(this.roomInfo?.Id);
    }
  }
}
