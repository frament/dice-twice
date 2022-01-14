import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomsService } from '../services/rooms.service';
import { FullRoomInfo } from '../../../../api/src/app/services/rooms/full-room-info';
import { UserService } from '../services/user.service';
import { User } from '../../../../api/src/app/services/user/user';
import { Hero } from '../../../../api/src/app/services/heroes/hero';
import { MatDialog } from '@angular/material/dialog';
import { InviteDialogComponent } from './invite-dialog/invite-dialog.component';
import { SocketService } from '../services/socket.service';
import { Subscription } from 'rxjs';
import { MediaService } from '../services/media.service';
import { RoomAudio, RoomMainShow, roomStates } from '../../../../api/src/app/services/rooms/room';

@Component({
  selector: 'dice-twice-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  constructor(private route:ActivatedRoute,
              private room:RoomsService,
              public user:UserService,
              public dialog: MatDialog,
              private socket: SocketService,
              private media: MediaService) { }

  currentID:string = '';
  roomInfo:FullRoomInfo|undefined;
  masterMode:boolean = false;
  playerMode:boolean = false;
  watchMode:boolean = false;

  players:Partial<User>[] = [];
  heroes:Partial<Hero>[] = [];

  sub:Subscription|undefined;

  mainShow:RoomMainShow|undefined;
  mainShowData:any;

  audioFile:any;

  roomAudio:RoomAudio|undefined;

  @ViewChild('audio') audio!: ElementRef<HTMLAudioElement>;

  ngOnInit(): void {
    this.route.params.subscribe(async (params:any) => {
      if (params?.id && params.id !== this.currentID) {
        this.unsub();
        this.currentID = params.id;
        await this.updateRoom();
        this.playerInit();
        this.subscribeEvents();
      }
    });
  }

  unsub():void{
    this.socket.unsub('room_'+this.roomInfo?.Id);
    this.sub?.unsubscribe();
  }

  subscribeEvents():void{
    this.socket.sub('room_'+this.roomInfo?.Id);
    this.sub = this.socket.on('room_'+this.roomInfo?.Id).subscribe(async ({message,data}) => {
      if (message === 'show_image'){ await this.showImage(data);}
      if (message === 'state'){ await this.updateRoom();}
      if (message === 'audio'){ await this.playAudio(data.id, data.action);}
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

  playerInit(){
    this.audio.nativeElement.addEventListener('pause', async () => {
      if (this.roomAudio?.currentFile){
        await this.sendPlayAudio(this.roomAudio?.currentFile, 'pause')
      }
    });
    this.audio.nativeElement.addEventListener('play', async () => {
      if (this.roomAudio?.currentFile){
        await this.sendPlayAudio(this.roomAudio?.currentFile, 'play')
      }
    });
  }

  clearMain():void {
    this.mainShow = undefined;
  }

  async sendShowImage(id:number):Promise<void>{
    if(!this.roomInfo?.Id){return;}
    await this.socket.emit('room_'+this.roomInfo?.Id, {message:'show_image', data:id});
  }
  async showImage(id:number):Promise<void>{
    this.mainShow = {
      Data: id,
      Type: 'image'
    };
    this.mainShowData = await this.media.getFile(id);
    if (this.masterMode && this.roomInfo?.Id){
      await this.room.setMainShow(this.roomInfo?.Id, this.mainShow);
    }
  }

  async sendPlayAudio(id:number, action:'play'|'pause'):Promise<void>{
    if(!this.roomInfo?.Id){return;}
    await this.socket.emit('room_'+this.roomInfo?.Id, {message:'audio', data:{id,action}});
  }
  async playAudio(id:number, action:'play'|'pause'):Promise<void>{
    if (this.roomAudio?.currentFile !== id){
      if (!this.roomAudio){
        this.roomAudio = { currentFile: id, currentPosition: 0, playlist: []};
      }else{
        this.roomAudio.currentFile = id;
      }
      this.audioFile = await this.media.getFile(id);
      this.audio.nativeElement.src = this.audioFile as string;
    }
    switch (action) {
      case 'play': await this.audio.nativeElement.play(); break;
      case 'pause': {
        this.roomAudio.currentPosition = this.audio.nativeElement.currentTime;
        await this.audio.nativeElement.pause();
      } break;
    }
    if (this.roomAudio && this.roomInfo?.Id){
      await this.room.setAudio(this.roomInfo?.Id, this.roomAudio);
    }
  }

  async emitImageAction(action:{code:string, name:string, fileId:number}){
    if (action.code === 'show'){
      await this.sendShowImage(action.fileId);
    }
    if (action.code === 'delete'){
      await this.media.deleteFile(action.fileId)
    }
  }

  async emitAudioAction(action:{code:string, name:string, fileId:number}){
    if (action.code === 'play'){
      await this.sendPlayAudio(action.fileId,'pause');
    }
    if (action.code === 'delete'){
      await this.media.deleteFile(action.fileId)
    }
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
      this.mainShow = this.roomInfo.mainShow;
      this.roomAudio = this.roomInfo.audio;
      if (this.mainShow?.Type === 'image'){
        this.mainShowData = await this.media.getFile(this.mainShow.Data);
      }
      if (this.roomAudio?.currentFile){
        this.audioFile =  await this.media.getFile(this.roomAudio?.currentFile);
        this.audio.nativeElement.currentTime = this.roomAudio?.currentPosition ?? 0;
        this.audio.nativeElement.src = this.audioFile;
      }
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
