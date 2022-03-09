import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dice-twice-add-room-dialog',
  templateUrl: './add-room-dialog.component.html',
  styleUrls: ['./add-room-dialog.component.scss']
})
export class AddRoomDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddRoomDialogComponent>) { }
  nameRoom:string = '';

  ngOnInit(): void {
  }

  async addRoom():Promise<void>{
    this.dialogRef.close(this.nameRoom);
  }
}
