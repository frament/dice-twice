import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FullRoomInfo } from '../../../../../api/src/app/services/rooms/full-room-info';

@Component({
  selector: 'dice-twice-invite-dialog',
  templateUrl: './invite-dialog.component.html',
  styleUrls: ['./invite-dialog.component.scss']
})
export class InviteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<InviteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public room: FullRoomInfo
              ) { }
  ngOnInit(): void {}

  getPlayerLink():string{
    return location.origin+'/room/'+this.room.Id+'/'+this.room.playerGuid;
  }

  getWatcherLink():string{
    return location.origin+'/room/'+this.room.Id+'/'+this.room.watcherGuid;
  }

}
