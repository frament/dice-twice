import { Component, OnInit } from '@angular/core';
import { GlobalMaterialSelectorComponent } from './global-material-selector/global-material-selector.component';
import { MatDialog } from '@angular/material/dialog';
import { MediaService } from '../../services/media.service';

@Component({
  selector: 'dice-twice-global-materials',
  templateUrl: './global-materials.component.html',
  styleUrls: ['./global-materials.component.scss']
})
export class GlobalMaterialsComponent implements OnInit {

  constructor(public dialog: MatDialog, private media:MediaService) { }
  selected:string | ArrayBuffer | null = null;
  ngOnInit(): void {
    this.showSelector();
  }

  showSelector(){
    const dialogRef = this.dialog.open(GlobalMaterialSelectorComponent, {
      width: '70vw'
    });
    dialogRef.afterClosed().subscribe(async result => {
      console.log(result);
      this.selected = await this.media.getFile(result);
    });
  }

}
