import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Hero } from '../../../../../api/src/app/services/heroes/hero';
import { RoomService } from '../room.service';
import { UserService } from '../../services/user.service';
// @ts-ignore
import Peer from 'peerjs';
import { User } from '../../../../../api/src/app/services/user/user';
import { CallService } from '../../services/call.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'dice-twice-room-user-card',
  templateUrl: './room-user-card.component.html',
  styleUrls: ['./room-user-card.component.scss']
})
export class RoomUserCardComponent implements OnInit, OnDestroy {

  constructor(private room: RoomService, private user:UserService, private callService:CallService) { }

  @Input() player!: Partial<User>;
  @Input() hero: Hero|undefined;
  isCurrentUser = false;
  isMaster = false;
  private mediaCall: Peer.MediaConnection;
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  roomId = '';
  stream!:MediaStream;


  async ngOnInit(): Promise<void> {
    this.isCurrentUser = this.user.currentUser?.userId === this.player?.Id;
    this.roomId = (this.player?.Id ?? 0)+'';
    this.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    if (!this.callService.streams[this.player?.Id+'']){
      this.callService.streams[this.player?.Id+''] = new BehaviorSubject<MediaStream | null>(null);
    }
    if (this.isCurrentUser){
      this.video.nativeElement.srcObject = this.stream;
    } else {
      try{
        await this.establishMediaCall(this.player?.Id+'');
      }catch (e) {
        console.error(e);
      }
    }
  }

  ngOnDestroy() {
    this.closeMediaCall();
    // this.destroyPeer();
  }

  async establishMediaCall(userID:string) {
    try {
      if (!this.callService.streams[userID]){
        this.callService.streams[userID] = new BehaviorSubject<MediaStream | null>(null);
      }
      this.callService.streams[userID].subscribe(stream => {
        this.video.nativeElement.srcObject = stream;
      })
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (this.callService.peer.destroyed){
        this.callService.initPeerNew(this.user.currentUser?.userId+'', true);
      }
      this.mediaCall = this.callService.peer.call(userID, stream);
      if (!this.mediaCall) {
        console.error('Unable to connect to remote peer');
        return;
      }
      this.mediaCall.on('stream',(remoteStream: MediaStream) => {
        this.callService.streams[userID].next(remoteStream);
      });
      this.mediaCall.on('error', (err: any) => {
        console.error(err);
      });
      this.mediaCall.on('close', () => {
        this.onCallClose();
      });
    } catch (ex) {
      console.error(ex);
    }
  }

  private onCallClose() {
    (this.video?.nativeElement.srcObject as MediaStream)?.getTracks().forEach(track => track.stop());
  }
  public closeMediaCall() {
    this.mediaCall?.close();
    if (!this.mediaCall) {
      this.onCallClose()
    }
  }
  public destroyPeer() {
    this.mediaCall?.close();
    this.callService.peer?.disconnect();
    this.callService.peer?.destroy();
  }

}
