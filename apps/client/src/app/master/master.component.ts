import { Component, OnInit } from '@angular/core';
import { AddRoomDialogComponent } from './add-room-dialog/add-room-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MediaService } from '../services/media.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dice-twice-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

  constructor(public dialog: MatDialog, private media:MediaService, private router: Router) { }

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

  async emitImageAction(action:{code:string, name:string, fileId:number}){
    if (action.code === 'delete'){
      await this.media.deleteFile(action.fileId);
    }
  }
  async goTo(link:string){
    await this.router.navigateByUrl(link);
  }

}
