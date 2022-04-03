import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomsService } from '../services/rooms.service';
import { UserService } from '../services/user.service';
import { PlayerHero } from '../../../../api/src/app/services/heroes/hero';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InviteDialogComponent } from './invite-dialog/invite-dialog.component';
import { SocketService } from '../services/socket.service';
import { Subscription } from 'rxjs';
import { MediaService } from '../services/media.service';
import { RoomAudio, RoomMainShow, roomStates } from '../../../../api/src/app/services/rooms/room';
import { DeleteRoomDialogComponent } from './delete-room-dialog/delete-room-dialog.component';
import { RoomService } from './room.service';
import { User } from '../../../../api/src/app/services/user/user';
import { CallService } from '../services/call.service';
import { roomButtons } from './room-buttons/room-buttons.component';
import { DiceRollerComponent } from './dice-roller/dice-roller.component';

@Component({
  selector: 'dice-twice-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {

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
  showMasterFiles:boolean = false;
  showGlobalFiles:boolean = false;
  showHero:boolean = false;
  showDice:boolean = false;


  players:PlayerHero[] = [];
  master!:Partial<User>|undefined;

  sub:Subscription|undefined;

  mainShow:RoomMainShow|undefined;

  audioFile:any;

  roomAudio:RoomAudio|undefined;


  // new consts
  roomTitle:string = '';
  roomId: number = 0;
  ngOnInit(): void {
    this.callService.initPeer(this.user.currentUser?.userId+'');
    this.rooms.currentRoomInfo.subscribe(async x=>{
      if (!x) return;
      this.roomTitle = x?.Name ?? '';
      this.roomId = x?.Id ?? 0;
    });
    this.route.params.subscribe(async (params:any) => {
      if (params?.guid){
        await this.rooms.join(parseInt(params.id,10),params.guid);
        await this.router.navigateByUrl('room/'+params.id)
      }
      if (params?.id && params.id !== this.currentID) {
        this.unsub();
        this.currentID = params.id;
        await this.rooms.setRoom(this.currentID);
        await this.updateRoom();
        this.subscribeEvents();
        await this.socket.emitSocket('join_room',{Id:this.currentID, idUser:this.user.currentUser?.userId});
      }
    });
  }

  ngOnDestroy() {
    this.unsub();
    this.callService.destroyPeer();
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

  async emitImageAction(action:{code:string, name:string, fileId:number}){
    if (action.code === 'show'){
      await this.sendShowImage(action.fileId);
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

  dialogs: { [code:string]:MatDialogRef<any> } = {};

  emitButtonClick(button:roomButtons){
    switch (button) {
      case 'dice': {
        if (this.dialogs['dice']){
          this.dialogs['dice'].close(); delete this.dialogs['dice'];
        } else {
          this.dialogs['dice'] = this.dialog.open(DiceRollerComponent,{hasBackdrop:false, position:{top:'100px'}});
        }
      } break;
      case 'images': this.showImageList = !this.showImageList; break;
      case 'hero': this.showHero = !this.showHero; break;
      case 'masterMaterials': this.showMasterFiles = !this.showMasterFiles; break;
      case 'wiki': this.showGlobalFiles = !this.showGlobalFiles; break;
      case 'notes': console.log('notes'); break;
      case 'unicorn': console.log('unicorn'); break;
    }
  }
}
