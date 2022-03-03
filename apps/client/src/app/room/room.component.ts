import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomsService } from '../services/rooms.service';
import { UserService } from '../services/user.service';
import { PlayerHero } from '../../../../api/src/app/services/heroes/hero';
import { MatDialog } from '@angular/material/dialog';
import { InviteDialogComponent } from './invite-dialog/invite-dialog.component';
import { SocketService } from '../services/socket.service';
import { Subscription } from 'rxjs';
import { MediaService } from '../services/media.service';
import { RoomAudio, RoomMainShow, roomStates } from '../../../../api/src/app/services/rooms/room';
import { DeleteRoomDialogComponent } from './delete-room-dialog/delete-room-dialog.component';
import { RoomService } from './room.service';
import { User } from '../../../../api/src/app/services/user/user';
import { CallService } from '../services/call.service';

@Component({
  selector: 'dice-twice-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  constructor(private route:ActivatedRoute,
              private router: Router,
              private rooms:RoomsService,
              public user:UserService,
              public dialog: MatDialog,
              private socket: SocketService,
              private media: MediaService,
              public room: RoomService,
              private callService: CallService) { }

  currentID:string = '';
  masterMode:boolean = false;
  playerMode:boolean = false;
  watchMode:boolean = false;

  showImageList:boolean = false;
  showHero:boolean = false;
  showDice:boolean = false;


  players:PlayerHero[] = [];
  master!:Partial<User>|undefined;

  sub:Subscription|undefined;

  mainShow:RoomMainShow|undefined;

  audioFile:any;

  roomAudio:RoomAudio|undefined;

  @ViewChild('audio') audio!: ElementRef<HTMLAudioElement>;

  ngOnInit(): void {
    this.callService.initPeerNew(this.user.currentUser?.userId+'');
    this.route.params.subscribe(async (params:any) => {
      if (params?.guid){
        await this.rooms.join(parseInt(params.id,10),params.guid);
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
    this.socket.unsub('room_'+this.room.roomInfo?.Id);
    this.sub?.unsubscribe();
  }

  subscribeEvents():void{
    this.socket.sub('room_'+this.room.roomInfo?.Id);
    this.sub = this.socket.on('room_'+this.room.roomInfo?.Id).subscribe(async ({message,data}) => {
      if (message === 'show_image'){ await this.showImage(data);}
      if (message === 'state'){ await this.updateRoom();}
      if (message === 'audio'){ await this.playAudio(data.id, data.action);}
      if (message === 'update_players'){ await this.updatePlayers();}
    });
  }

  invitePlayer(){
    const dialogRef = this.dialog.open(InviteDialogComponent, {
       data: this.room.roomInfo
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  EmitDeleteRoomDialog(){
    const dialogRef = this.dialog.open(DeleteRoomDialogComponent, {
      data: this.room.roomInfo
    });
    dialogRef.afterClosed().subscribe(async (result) => {
     if (result && this.room.roomInfo?.Id){
       await this.rooms.deleteRoom(this.room.roomInfo.Id);
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
    if(!this.room.roomInfo?.Id){return;}
    await this.socket.emit('room_'+this.room.roomInfo?.Id, {message:'show_image', data:id});
  }
  async showImage(id:number):Promise<void>{
    this.mainShow = {
      Data: id,
      Type: 'image'
    };
    this.room.mainShowData = await this.media.getFile(id);
    this.room.sceneType.next('image');
    if (this.masterMode && this.room.roomInfo?.Id){
      await this.rooms.setMainShow(this.room.roomInfo?.Id, this.mainShow);
    }
  }

  async sendPlayAudio(id:number, action:'play'|'pause'):Promise<void>{
    if(!this.room.roomInfo?.Id){return;}
    await this.socket.emit('room_'+this.room.roomInfo?.Id, {message:'audio', data:{id,action}});
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
    if (this.roomAudio && this.room.roomInfo?.Id){
      await this.rooms.setAudio(this.room.roomInfo?.Id, this.roomAudio);
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
      await this.rooms.setSate(parseInt(this.currentID,10), state);
      await this.updateRoom();
    }
  }

  async updateRoom(): Promise<void>{
    if (this.currentID){
      this.room.roomInfo = await this.rooms.getRoomInfo(this.currentID);
      this.mainShow = this.room.roomInfo.mainShow;
      this.roomAudio = this.room.roomInfo.audio;
      this.master = await this.user.getUserProfile(this.room.roomInfo.Master);
      if (this.mainShow?.Type === 'image'){
        this.room.mainShowData = await this.media.getFile(this.mainShow.Data);
        this.room.sceneType.next('image');
      }
      if (this.roomAudio?.currentFile){
        this.audioFile =  await this.media.getFile(this.roomAudio?.currentFile);
        this.audio.nativeElement.currentTime = this.roomAudio?.currentPosition ?? 0;
        this.audio.nativeElement.src = this.audioFile;
      }
      // await this.updatePlayers();
      this.updateMode();
    }
  }

  updateMode():void{
    if (this.room.roomInfo && this.user.currentUser) {
      this.masterMode = this.room.roomInfo?.Master === this.user.currentUser?.userId
      this.playerMode = this.room.roomInfo?.Players.findIndex(x=> x.playerId === this.user.currentUser?.userId) !==-1;
      this.watchMode = this.room.roomInfo?.Watchers.indexOf(this.user.currentUser?.userId) !==-1;
    } else {
      this.playerMode = false;
      this.masterMode = false;
      this.watchMode = false;
    }
  }

  async updatePlayers():Promise<void>{
    if (this.room.roomInfo?.Id !== undefined){
      this.players = await this.rooms.getRoomPlayersHeroes(this.room.roomInfo?.Id);
    }
  }
}
