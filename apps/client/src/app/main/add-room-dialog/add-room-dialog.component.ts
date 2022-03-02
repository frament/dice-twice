import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RoomsService } from '../../services/rooms.service';

@Component({
  selector: 'dice-twice-add-room-dialog',
  templateUrl: './add-room-dialog.component.html',
  styleUrls: ['./add-room-dialog.component.scss']
})
export class AddRoomDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddRoomDialogComponent>,
              private service: RoomsService) { }
  nameRoom:string = '';

  ngOnInit(): void {
  }

  async addRoom():Promise<void>{
    const result = await this.service.addRoom(this.nameRoom);
    this.dialogRef.close(result);
  }
}
