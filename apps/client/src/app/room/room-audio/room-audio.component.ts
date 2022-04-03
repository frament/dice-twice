import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CallService } from '../../services/call.service';
import { RoomsService } from '../../services/rooms.service';
// @ts-ignore
import Peer from 'peerjs';
import { UserService } from '../../services/user.service';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { output } from '@nrwl/workspace';

@Component({
  selector: 'dice-twice-room-audio',
  templateUrl: './room-audio.component.html',
  styleUrls: ['./room-audio.component.scss']
})
export class RoomAudioComponent implements OnInit {

  constructor(private callService: CallService, private rooms:RoomsService, private user:UserService) { }
  @ViewChild('audio',{static:true}) audio!: ElementRef<HTMLAudioElement>;
  private peer: Peer;
  private mediaAudio: Peer.MediaConnection;
  private stream:BehaviorSubject<MediaStream|null> = new BehaviorSubject<MediaStream | null>(null);
  roomId: number = 0;
  isMaster = false;
  ngOnInit(): void {
    this.rooms.currentRoomInfo.subscribe(x=>{
      if (!x) return;
      this.roomId = x?.Id ?? 0;
      this.isMaster = x.Master === this.user.currentUser?.userId;
      this.peer = new Peer(this.user.currentUser?.userId+'_music', {path:'/peerjs',host:'/',port: environment.production ? 443 : 3333});
      this.peer.on('call', async (call: Peer.MediaConnection) => {
        console.log('call');
        call.on('stream',(stream:MediaStream) => {
          console.log('call stream');
          this.stream.next(stream);
        });
        call.on('error', (err: any) => console.error(err));
      });
      this.stream.subscribe(async x=>{
        if (!this.isMaster){
          this.audio.nativeElement.srcObject = x;
          await this.audio.nativeElement.play();
        }
      });
      if (!this.isMaster){
        /*const stream: MediaStream = (this.audio.nativeElement as any).captureStream()
        // this.callService.initPeerMusic(this.user.currentUser?.userId+'', stream);
        this.mediaAudio = this.peer.call(x.Master+'_music', stream);
        this.mediaAudio?.on('stream',(remoteStream: MediaStream) => {
          console.log('stream');
          this.stream.next(remoteStream);
        });
        this.mediaAudio?.on('error', (err: any) => console.error(err));
        this.mediaAudio?.on('close', () => this.closeMediaCall());*/
      } else {
        this.audio.nativeElement.src = '/assets/Tavern Brawl Music.mp3';
        this.audio.nativeElement.onplay = (x) => {
          // @ts-ignore
          // this.callService.initPeerMusic(this.user.currentUser?.userId+'', x.currentTarget.captureStream());
          const stream:MediaStream = x.currentTarget.captureStream();
          console.log(stream.getAudioTracks());
          this.rooms.currentRoomInfo.getValue()?.Players.forEach(p=>{
            const call = this.peer.call(p.playerId+'_music', stream);
            console.log('output call', stream);
            call.on('stream', ()=> console.log('output stream') );
          });
        }
      }
      });
  }

  public closeMediaCall() {
    this.mediaAudio?.close();
    (this.audio?.nativeElement.srcObject as MediaStream)?.getTracks().forEach(track => track.stop());
  }

}
