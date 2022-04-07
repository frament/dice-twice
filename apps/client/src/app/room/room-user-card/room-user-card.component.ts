import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Hero } from '../../../../../api/src/app/services/heroes/hero';
import { RoomService } from '../room.service';
import { UserService } from '../../services/user.service';
// @ts-ignore
import Peer from 'peerjs';
import { User } from '../../../../../api/src/app/services/user/user';
import { CallService } from '../../services/call.service';
import { BehaviorSubject } from 'rxjs';
import { RoomsService } from '../../services/rooms.service';

@Component({
  selector: 'dice-twice-room-user-card',
  templateUrl: './room-user-card.component.html',
  styleUrls: ['./room-user-card.component.scss']
})
export class RoomUserCardComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(private room: RoomService, private rooms: RoomsService, private user:UserService, private callService:CallService) { }

  @Input() player!: Partial<User>;
  @Input() hero: Hero|undefined;
  isCurrentUser = false;
  isMaster = false;
  private mediaCall: Peer.MediaConnection;
  @ViewChild('video',{static:true}) video!: ElementRef<HTMLVideoElement>;
  roomId = '';
  videoOn = true;
  audioOn = true;
  async ngOnInit(): Promise<void> {
    this.isCurrentUser = this.user.currentUser?.userId === this.player?.Id;
    this.rooms.currentRoomInfo.subscribe(x=>{
      if (!this.user.currentUser || !x) { this.isMaster = false; return}
      this.isMaster = this.user.currentUser?.userId === x?.Master;
    })
    this.roomId = (this.player?.Id ?? 0)+'';
    if (!this.callService.streams[this.player?.Id+'']){
      this.callService.streams[this.player?.Id+''] = new BehaviorSubject<MediaStream | null>(null);
    }
  }
  async ngAfterViewInit(){
    if (!this.video) return;
    if (this.isCurrentUser){
      this.callService.stream.subscribe(stream => {
        this.video.nativeElement.srcObject = stream;
      });
    } else {
      try{
        await this.establishMediaCall(this.player?.Id+'');
        /*this.callService.peerInited.subscribe(async (subed) => {
          if (!subed) return;
          await this.establishMediaCall(this.player?.Id+'');
        })*/
      }catch (e) {
        // console.error(e);
      }
    }
  }
  ngOnDestroy() {
    this.closeMediaCall();
  }
  async establishMediaCall(userID:string) {
    try {
      if (!this.callService.streams[userID]){
        this.callService.streams[userID] = new BehaviorSubject<MediaStream | null>(null);
      }
      this.callService.streams[userID].subscribe(stream => {
        if (this.video?.nativeElement){
          this.video.nativeElement.srcObject = stream;
        }
      })
      if (this.callService.peer?.destroyed){
        await this.callService.initPeer(this.user.currentUser?.userId+'', true);
      }
      this.callService.stream.subscribe(stream => {
        if (!stream){ return; }
        this.mediaCall = this.callService.peer?.call(userID, stream);
        if (!this.mediaCall) {
          console.error('Unable to connect to remote peer');
          return;
        }
        this.mediaCall.on('stream',(remoteStream: MediaStream) => {
          this.callService.streams[userID].next(remoteStream);
        });
        this.mediaCall.on('error', (err: any) => console.error(err));
        this.mediaCall.on('close', () => this.onCallClose());
      })
    } catch (ex) {
      console.error(ex);
    }
  }
  private onCallClose() {
    (this.video?.nativeElement.srcObject as MediaStream)?.getTracks().forEach(track => track.stop());
    this.callService.streams[this.player?.Id+'']?.getValue()?.getTracks().forEach(track => track.stop());
    delete this.callService.streams[this.player?.Id+''];
  }
  public closeMediaCall() {
    this.mediaCall?.close();
    this.onCallClose();
  }
  public async kickUser():Promise<void>{
    const info = this.rooms.currentRoomInfo.getValue();
    if (!info) return ;
    await this.rooms.kickRoomPlayer(info.Id, this.player?.Id ??0);
  }
  public buttonClick(text:string){
    console.log(text);
  }
  async switchAudio():Promise<void>{
    this.audioOn = !this.audioOn;
    await this.callService.setStream(this.videoOn, this.audioOn);
  }
  async switchVideo():Promise<void>{
    this.videoOn = !this.videoOn;
    await this.callService.setStream(this.videoOn, this.audioOn);
  }
}
