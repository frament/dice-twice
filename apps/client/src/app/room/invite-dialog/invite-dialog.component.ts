import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RoomsService } from '../../services/rooms.service';

@Component({
  selector: 'dice-twice-invite-dialog',
  templateUrl: './invite-dialog.component.html',
  styleUrls: ['./invite-dialog.component.scss']
})
export class InviteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<InviteDialogComponent>,
              private service: RoomsService) { }

  ngOnInit(): void {
  }

}
