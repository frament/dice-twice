import { NgxFileDropEntry } from 'ngx-file-drop';

export interface ImageListItem {
  room:number;
  index: number;
  entry: NgxFileDropEntry;
  file:string | ArrayBuffer | null;
}
