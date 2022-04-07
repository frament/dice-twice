import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CallService } from '../../services/call.service';
import { RoomsService } from '../../services/rooms.service';
import { UserService } from '../../services/user.service';
import { BehaviorSubject } from 'rxjs';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'dice-twice-room-audio',
  templateUrl: './room-audio.component.html',
  styleUrls: ['./room-audio.component.scss']
})
export class RoomAudioComponent implements OnInit {

  constructor(private callService: CallService,
              private rooms:RoomsService,
              private user:UserService,
              private socket: SocketService,) { }
  @ViewChild('audio',{static:true}) audio!: ElementRef<HTMLAudioElement>;
  private stream:BehaviorSubject<MediaStream|null> = new BehaviorSubject<MediaStream | null>(null);
  roomId: number = 0;
  isMaster = false;
  ngOnInit(): void {
    this.rooms.currentRoomInfo.subscribe(async x=> {
      if (!x) return;
      this.roomId = x?.Id ?? 0;
      this.isMaster = x.Master === this.user.currentUser?.userId;
      if (this.isMaster){
        const track = '/assets/Tavern Brawl Music.mp3';
        await this.changeTrack(track);
        this.socket.sub(this.roomId+'_audio');
        this.audio.nativeElement.controls = true;
        this.audio.nativeElement.onplay = async (x) =>{
          await this.play();
        }
        this.audio.nativeElement.onpause = async (x) =>{
          await this.pause();
        }
        this.audio.nativeElement.onload = async (x) => {
          await this.sendCurrentTrack();
        }
        this.socket.on(this.roomId+'_audio').subscribe( async (data:{cmd:string, data?:any}) => {
          if (data.cmd === 'get_track') {
            await this.sendCurrentTrack();
            await this.sendCurrentTime();
          }
        })
      } else {
        this.audio.nativeElement.controls = false;
        this.socket.sub(this.roomId+'_audio');
        this.socket.on(this.roomId+'_audio').subscribe( async (data:{cmd:string, data?:any}) => {
          switch (data.cmd) {
            case 'track': this.audio.nativeElement.src = data.data; break;
            case 'play': {
              this.audio.nativeElement.currentTime = data.data;
              await this.audio.nativeElement.play();
            } break;
            case 'pause': this.audio.nativeElement.pause(); break;
            case 'set_time': this.audio.nativeElement.currentTime = data.data; break;
          }
        });
        await this.getCurrentTrack();
      }
    });
  }

  async changeTrack(track:string):Promise<void>{
    this.audio.nativeElement.src = track;
    await this.socket.emit(this.roomId+'_audio', {cmd:'track', data: this.audio.nativeElement.src});
  }
  async play():Promise<void>{
    await this.socket.emit(this.roomId+'_audio', {cmd:'play', data:this.audio.nativeElement.currentTime});
  }
  async pause():Promise<void>{
    await this.socket.emit(this.roomId+'_audio', {cmd:'pause'});
  }
  async sendCurrentTime():Promise<void>{
    await this.socket.emit(this.roomId+'_audio', {cmd:'set_time', data:this.audio.nativeElement.currentTime});
  }
  async sendCurrentTrack():Promise<void>{
    await this.socket.emit(this.roomId+'_audio', {cmd:'track', data: this.audio.nativeElement.src});
  }

  async getCurrentTrack():Promise<void>{
    await this.socket.emit(this.roomId+'_audio', {cmd:'get_track'});
  }

}
