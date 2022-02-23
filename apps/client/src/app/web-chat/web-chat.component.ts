import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { filter, Observable, of, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CallService } from '../services/call.service';
import { CallInfoDialogComponent, DialogData } from './call-info-dialog/call-info-dialog.component';

@Component({
  selector: 'dice-twice-web-chat',
  templateUrl: './web-chat.component.html',
  styleUrls: ['./web-chat.component.scss']
})
export class WebChatComponent implements OnInit, OnDestroy {
  public isCallStarted$: Observable<boolean>;
  private peerId: string;

  @ViewChild('localVideo') localVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef<HTMLVideoElement>;

  constructor(public dialog: MatDialog, private callService: CallService) {
    this.isCallStarted$ = this.callService.isCallStarted$;
    this.peerId = this.callService.initPeer();
  }

  ngOnInit(): void {
    this.callService.localStream$
      .pipe(filter((res: any) => !!res))
      .subscribe(stream => this.localVideo.nativeElement.srcObject = stream)
    this.callService.remoteStream$
      .pipe(filter((res: any) => !!res))
      .subscribe(stream => this.remoteVideo.nativeElement.srcObject = stream)
  }

  ngOnDestroy(): void {
    this.callService.destroyPeer();
  }

  public showModal(joinCall: boolean): void {
    let dialogData: DialogData = joinCall ? ({ peerId: null, joinCall: true }) : ({ peerId: this.peerId, joinCall: false });
    const dialogRef = this.dialog.open(CallInfoDialogComponent, {
      width: '250px',
      data: dialogData
    });

    dialogRef.afterClosed()
      .pipe(
        switchMap(peerId =>
          joinCall ? of(this.callService.establishMediaCall(peerId)) : of(this.callService.enableCallAnswer())
        ),
      )
      .subscribe(_  => { });
  }

  public endCall() {
    this.callService.closeMediaCall();
  }
}
