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
  streams:{[id:string]:BehaviorSubject<MediaStream|null>} = {};
  public initPeerNew(id:string, force?:boolean):void {
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
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      call.answer(stream);
      call.on('stream',(stream:MediaStream) => this.streams[call.peer].next(stream));
      call.on('error', (err: any) => console.error(err));
      // call.on('close', () => console.log('call closed'));
    });
    //this.peer.on('disconnected', () => console.log('peer disconnected'));
    this.peer.on('error', (err:any) => console.error(err));
    //this.peer.on('open', () => console.log('peer open'));
    //this.peer.on('connection', (conn:any) => console.log('peer connection'));
  }



}
