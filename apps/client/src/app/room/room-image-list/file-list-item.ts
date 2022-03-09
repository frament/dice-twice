import { NgxFileDropEntry } from 'ngx-file-drop';

export interface FileListItem {
  room:number;
  index: number;
  entry: NgxFileDropEntry;
  file: any;
  type:string;
}
