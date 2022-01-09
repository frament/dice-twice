import { Component, OnInit } from '@angular/core';
import { AddRoomDialogComponent } from './add-room-dialog/add-room-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'dice-twice-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  async addRoom():Promise<void>{
    const dialogRef = this.dialog.open(AddRoomDialogComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}
