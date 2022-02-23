import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'dice-twice-call-info-dialog',
  templateUrl: './call-info-dialog.component.html',
  styleUrls: ['./call-info-dialog.component.scss']
})
export class CallInfoDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CallInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _snackBar: MatSnackBar
  ) { }

  public showCopiedSnackBar() {
    this._snackBar.open('Peer ID Copied!', 'Hurrah', {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

}

export interface DialogData {
  peerId?: string|null;
  joinCall: boolean
}
