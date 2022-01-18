import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomsService } from '../services/rooms.service';
import { FullRoomInfo } from '../../../../api/src/app/services/rooms/full-room-info';
import { UserService } from '../services/user.service';
import { PlayerHero } from '../../../../api/src/app/services/heroes/hero';
import { MatDialog } from '@angular/material/dialog';
import { InviteDialogComponent } from './invite-dialog/invite-dialog.component';
import { SocketService } from '../services/socket.service';
import { Subscription } from 'rxjs';
import { MediaService } from '../services/media.service';
import { RoomAudio, RoomMainShow, roomStates } from '../../../../api/src/app/services/rooms/room';
import { DeleteRoomDialogComponent } from './delete-room-dialog/delete-room-dialog.component';

@Component({
  selector: 'dice-twice-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  constructor(private route:ActivatedRoute,
              private router: Router,
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

  players:PlayerHero[] = [];

  sub:Subscription|undefined;

  mainShow:RoomMainShow|undefined;
  mainShowData:any;

  audioFile:any;

  roomAudio:RoomAudio|undefined;

  @ViewChild('audio') audio!: ElementRef<HTMLAudioElement>;

  ngOnInit(): void {
    this.route.params.subscribe(async (params:any) => {
      if (params?.guid){
        await this.room.join(parseInt(params.id,10),params.guid);
        await this.router.navigateByUrl('room/'+params.id)
      }
      if (params?.id && params.id !== this.currentID) {
        this.unsub();
        this.currentID = params.id;
        await this.updateRoom();
        this.audioInit();
        this.subscribeEvents();
        await this.socket.emitSocket('join_room',{Id:this.currentID, idUser:this.user.currentUser?.userId});
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
      if (message === 'update_players'){ await this.updatePlayers();}
    });
  }

  invitePlayer(){
    const dialogRef = this.dialog.open(InviteDialogComponent, {
       data: this.roomInfo
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  EmitDeleteRoomDialog(){
    const dialogRef = this.dialog.open(DeleteRoomDialogComponent, {
      data: this.roomInfo
    });
    dialogRef.afterClosed().subscribe(async (result) => {
     if (result && this.roomInfo?.Id){
       await this.room.deleteRoom(this.roomInfo.Id);
       await this.router.navigateByUrl('/');
     }
    });
  }

  audioInit(){
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

  async setRoomState(state:roomStates):Promise<void>{
    if (this.currentID && this.masterMode){
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
      await this.updatePlayers();
      this.updateMode();
    }
  }

  updateMode():void{
    if (this.roomInfo && this.user.currentUser){
      this.masterMode = this.roomInfo?.Master === this.user.currentUser?.userId
      this.playerMode = this.roomInfo?.Players.findIndex(x=> x.playerId === this.user.currentUser?.userId) !==-1;
      this.watchMode = this.roomInfo?.Watchers.indexOf(this.user.currentUser?.userId) !==-1;
    } else {
      this.playerMode = false;
      this.masterMode = false;
      this.watchMode = false;
    }
  }

  async updatePlayers():Promise<void>{
    if (this.roomInfo?.Id !== undefined){
      this.players = await this.room.getRoomPlayersHeroes(this.roomInfo?.Id);
      /*this.players = [
        {player:{Id:2, Name:'игрок1'}, hero:{Id:1, Name:'Герой1', IdUser:2}},
        {player:{Id:3, Name:'игрок2'}, hero:{Id:2, Name:'Герой2', IdUser:3}},
        {player:{Id:4, Name:'игрок3'}, hero:{Id:3, Name:'Герой3', IdUser:4}},
        {player:{Id:5, Name:'игрок4'}, hero:{Id:4, Name:'Герой4', IdUser:5}},
      ];*/
    }
  }
}
