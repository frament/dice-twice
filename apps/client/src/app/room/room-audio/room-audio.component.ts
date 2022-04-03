import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CallService } from '../../services/call.service';
import { RoomsService } from '../../services/rooms.service';
// @ts-ignore
import Peer from 'peerjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'dice-twice-room-audio',
  templateUrl: './room-audio.component.html',
  styleUrls: ['./room-audio.component.scss']
})
export class RoomAudioComponent implements OnInit {

  constructor(private callService: CallService, private rooms:RoomsService, private user:UserService) { }
  @ViewChild('audio') audio!: ElementRef<HTMLAudioElement>;
  private mediaAudio: Peer.MediaConnection;
  roomId: number = 0;
  isMaster = false;
  ngOnInit(): void {
    this.rooms.currentRoomInfo.subscribe(x=>{
      if (!x) return;
      this.roomId = x?.Id ?? 0;
      this.isMaster = x.Master === this.user.currentUser?.userId;
      // @ts-ignore
      this.callService.initPeerMusic(this.user.currentUser?.userId, this.audio.nativeElement.captureStream());
      if (!this.isMaster){
        // @ts-ignore
        this.mediaAudio = this.callService.peerMusic.call(x.Master+'_music', this.audio.nativeElement.captureStream());
        if (!this.mediaAudio) {
          console.error('Unable to connect to remote peer');
          return;
        }
        this.mediaAudio.on('stream',(remoteStream: MediaStream) => {
          this.audio.nativeElement.srcObject = remoteStream;
          this.audio.nativeElement.play();
        });
        this.mediaAudio.on('error', (err: any) => {
          console.error(err)
        });
        this.mediaAudio.on('close', () => {
          this.closeMediaCall()
        });
      } else {
        this.audio.nativeElement.src = '/assets/Tavern Brawl Music.mp3';
      }
      });
  }
  public closeMediaCall() {
    this.mediaAudio?.close();
    (this.audio?.nativeElement.srcObject as MediaStream)?.getTracks().forEach(track => track.stop());
  }

}
