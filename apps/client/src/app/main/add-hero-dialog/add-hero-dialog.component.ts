import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dice-twice-add-hero-dialog',
  templateUrl: './add-hero-dialog.component.html',
  styleUrls: ['./add-hero-dialog.component.scss']
})
export class AddHeroDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddHeroDialogComponent>) { }
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
