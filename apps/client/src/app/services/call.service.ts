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
  public stream:MediaStream|null = null;
  streams:{[id:string]:BehaviorSubject<MediaStream|null>} = {};
  public async initPeerNew(id:string, force?:boolean):Promise<void> {
    console.log('peer init');
    this.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    if (!this.peer || force){
      this.peer = new Peer(id, {path:'/peerjs',host:'/',port: environment.production ? 80 : 3333});
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
      call.answer(this.stream);
      call.on('stream',(stream:MediaStream) => this.streams[call.peer].next(stream));
      call.on('error', (err: any) => console.error(err));
      // call.on('close', () => console.log('call closed'));
    });
    //this.peer.on('disconnected', () => console.log('peer disconnected'));
    this.peer.on('error', (err:any) => console.error(err));
    //this.peer.on('open', () => console.log('peer open'));
    //this.peer.on('connection', (conn:any) => console.log('peer connection'));
  }

  public destroyPeer(){
    this.peer.disconnect();
    this.peer.destroy();
    this.peer = undefined;
    this.stream?.getTracks().forEach(x => x.stop());
  }
}
