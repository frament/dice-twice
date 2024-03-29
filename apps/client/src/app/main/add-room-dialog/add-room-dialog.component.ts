import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dice-twice-add-room-dialog',
  templateUrl: './add-room-dialog.component.html',
  styleUrls: ['./add-room-dialog.component.scss']
})
export class AddRoomDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddRoomDialogComponent>) { }
  name:string = '';
  defaultSvgColor = '#1D1D1B';
  activeSvgColor = '#430d0a';
  okColor = '#1D1D1B';
  cancelColor = '#1D1D1B';

  ngOnInit(): void {
  }

  add():void{
    this.dialogRef.close(this.name);
  }
  cancel(){
    this.dialogRef.close();
  }
}
