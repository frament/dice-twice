import { Injectable } from '@angular/core';
// @ts-ignore
import Peer from 'peerjs';
import { BehaviorSubject} from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CallService {
  constructor() { }
  public peer: Peer;
  public peerMusic: Peer;
  public stream:BehaviorSubject<MediaStream|null> = new BehaviorSubject<MediaStream | null>(null);
  public musicStream:BehaviorSubject<MediaStream|null> = new BehaviorSubject<MediaStream | null>(null);
  streams:{[id:string]:BehaviorSubject<MediaStream|null>} = {};
  public peerInited: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  async setStream(video:boolean, audio:boolean): Promise<void>{
    this.stream.next(await navigator.mediaDevices.getUserMedia({ video, audio }));
  }

  public async initPeer(id:string, force?:boolean):Promise<void> {
    await this.setStream(true, true);
    if (!this.peer || force){
      this.peer = new Peer(id, {path:'/peerjs',host:'/',port: environment.production ? 443 : 3333});
    }
    this.peer.on('close', () => {
      this.peer?.disconnect();
      this.peer?.destroy();
      // console.log('peer close')
    });
    this.peer.on('call', async (call: Peer.MediaConnection) => {
      if (!this.streams[call.peer]){
        this.streams[call.peer] = new BehaviorSubject<MediaStream | null>(null);
      }
      this.stream.subscribe(x=> call.answer(x));
      // call.answer(this.stream.getValue());
      call.on('stream',(stream:MediaStream) => this.streams[call.peer].next(stream));
      call.on('error', (err: any) => console.error(err));
    });
    this.peer.on('error', (err:any) => console.error(err));
    this.peerInited.next(true);
  }

  public initPeerMusic(id:string, stream: MediaStream):void {
    this.musicStream.next(stream);
    if (!this.peerMusic){
      this.peerMusic = new Peer(id+'_music', {path:'/peerjs',host:'/',port: environment.production ? 443 : 3333});
    }
    this.peerMusic.on('close', () => {
      this.peerMusic?.disconnect();
      this.peerMusic?.destroy();
    });
    this.peerMusic.on('call', async (call: Peer.MediaConnection) => {
      console.log('call');
      const stream = this.musicStream.getValue();
      call.answer(stream);
      call.on('error', (err: any) => console.error(err));
    });
    this.peerMusic.on('error', (err:any) => console.error(err));
  }

  public destroyPeer(){
    this.peer?.disconnect();
    this.peer?.destroy();
    this.peer = undefined;
    this.stream?.getValue()?.getTracks().forEach(x => x.stop());
  }
}
