import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Hero } from '../../../../../api/src/app/services/heroes/hero';
import { RoomService } from '../room.service';
import { UserService } from '../../services/user.service';
// @ts-ignore
import Peer from 'peerjs';
import { environment } from '../../../environments/environment';
import { User } from '../../../../../api/src/app/services/user/user';
import { CallService } from '../../services/call.service';

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
  private peer: Peer;
  private mediaCall: Peer.MediaConnection;
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  roomId = '';
  stream!:MediaStream;


  async ngOnInit(): Promise<void> {
    this.isCurrentUser = this.user.currentUser?.userId === this.player?.Id;
    // this.roomId = [(this.player?.Id ?? 0),(this.user.currentUser?.userId)].sort().join('_');
    this.roomId = (this.player?.Id ?? 0)+'';
    this.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    this.peer = this.initUserRoomCall(this.user.currentUser?.userId+'');
    if (this.isCurrentUser){
      this.video.nativeElement.srcObject = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      this.peer.on('call', async (call: any) => {
        this.mediaCall = call;
        this.mediaCall.answer(this.stream);
        this.mediaCall.on('error', (err: any) => console.error(err));
        this.mediaCall.on('close', () => this.onCallClose());
      });
    } else {
      await this.establishMediaCall(this.player?.Id+'');
    }
  }

  ngOnDestroy() {
    this.closeMediaCall();
    this.destroyPeer();
  }

  initUserRoomCall(id:string): Peer {
    if (!this.callService.peers[id]){
      this.callService.peers[id] = new Peer(id, {path:'/peerjs',host:'/',port: environment.production ? 80 : 3333});
    }
    return this.callService.peers[id];
  }

  async establishMediaCall(userID:string) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      //const connection = this.peer.connect(userID);
      //connection.on('error', (err: any) => console.error(err));
      this.mediaCall = this.peer.call(userID, stream);
      if (!this.mediaCall) {
        console.error('Unable to connect to remote peer');
      }
      this.mediaCall.on('stream',(remoteStream: MediaStream) => {
          this.video.nativeElement.srcObject = remoteStream;
      });
      this.mediaCall.on('error', (err: any) => {
        console.error(err);
      });
      this.mediaCall.on('close', () => this.onCallClose());
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
    this.peer?.disconnect();
    this.peer?.destroy();
  }

}
