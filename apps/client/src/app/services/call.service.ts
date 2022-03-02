import { Injectable } from '@angular/core';
// @ts-ignore
import Peer from 'peerjs';
import { BehaviorSubject, Subject } from 'rxjs';
import { Helper } from '../../../../api/src/app/helper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CallService {

  public peers: {[code:string]:Peer} = {}

  private peer: Peer;
  private mediaCall: Peer.MediaConnection;

  // @ts-ignore
  private localStreamBs: BehaviorSubject<MediaStream> = new BehaviorSubject(null);
  public localStream$ = this.localStreamBs.asObservable();
  // @ts-ignore
  private remoteStreamBs: BehaviorSubject<MediaStream> = new BehaviorSubject(null);
  public remoteStream$ = this.remoteStreamBs.asObservable();

  private isCallStartedBs = new Subject<boolean>();
  public isCallStarted$ = this.isCallStartedBs.asObservable();

  constructor(private snackBar: MatSnackBar) { }

  public initPeer(): string {
    if (!this.peer || this.peer.disconnected) {
      const peerJsOptions: Peer.PeerJSOption = {path:'/peerjs',host:'/',port: environment.production ? 80 : 3333};
      try {
        let id = Helper.newGuid();
        this.peer = new Peer(id, peerJsOptions);
        return id;
      } catch (error) {
        console.error(error);
      }
    }
    return '';
  }

  public async establishMediaCall(remotePeerId: string) {
    console.log('establish');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      const connection = this.peer.connect(remotePeerId);
      connection.on('error', (err: any) => {
        console.error(err);
        this.snackBar.open(err, 'Close');
      });

      this.mediaCall = this.peer.call(remotePeerId, stream);
      if (!this.mediaCall) {
        let errorMessage = 'Unable to connect to remote peer';
        this.snackBar.open(errorMessage, 'Close');
        throw new Error(errorMessage);
      }
      this.localStreamBs.next(stream);
      this.isCallStartedBs.next(true);

      this.mediaCall.on('stream',
        (remoteStream: MediaStream) => {
          this.remoteStreamBs.next(remoteStream);
        });
      this.mediaCall.on('error', (err: any) => {
        this.snackBar.open(err, 'Close');
        console.error(err);
        this.isCallStartedBs.next(false);
      });
      this.mediaCall.on('close', () => this.onCallClose());
    }
    catch (ex) {
      console.error(ex);
      // @ts-ignore
      this.snackBar.open(ex, 'Close');
      this.isCallStartedBs.next(false);
    }
  }

  public async enableCallAnswer() {
    console.log('enable');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      this.localStreamBs.next(stream);
      this.peer.on('call', async (call: any) => {

        this.mediaCall = call;
        this.isCallStartedBs.next(true);

        this.mediaCall.answer(stream);
        this.mediaCall.on('stream', (remoteStream: MediaStream) => {
          this.remoteStreamBs.next(remoteStream);
        });
        this.mediaCall.on('error', (err: any) => {
          this.snackBar.open(err, 'Close');
          this.isCallStartedBs.next(false);
          console.error(err);
        });
        this.mediaCall.on('close', () => this.onCallClose());
      });
    }
    catch (ex) {
      console.error(ex);
      // @ts-ignore
      this.snackBar.open(ex, 'Close');
      this.isCallStartedBs.next(false);
    }
  }

  private onCallClose() {
    this.remoteStreamBs?.value.getTracks().forEach(track => {
      track.stop();
    });
    this.localStreamBs?.value.getTracks().forEach(track => {
      track.stop();
    });
    this.snackBar.open('Call Ended', 'Close');
  }

  public closeMediaCall() {
    this.mediaCall?.close();
    if (!this.mediaCall) {
      this.onCallClose()
    }
    this.isCallStartedBs.next(false);
  }

  public destroyPeer() {
    this.mediaCall?.close();
    this.peer?.disconnect();
    this.peer?.destroy();
  }



}
