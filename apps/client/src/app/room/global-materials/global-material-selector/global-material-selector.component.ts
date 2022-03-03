import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dice-twice-global-material-selector',
  templateUrl: './global-material-selector.component.html',
  styleUrls: ['./global-material-selector.component.scss']
})
export class GlobalMaterialSelectorComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<GlobalMaterialSelectorComponent>) { }

  list: {name:string,id:number}[] = [
    {name:'файл1',id:1},
    {name:'файл2',id:2},
  ];
  ngOnInit(): void {
  }
  select(item:number):void{
    this.dialogRef.close(item);
  }

}
