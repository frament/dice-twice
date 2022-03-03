import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaService } from '../../services/media.service';
import { RoomService } from '../room.service';
import { RoomsService } from '../../services/rooms.service';
import { CacheService } from '../../services/cache.service';
import { ImageListItem } from '../room-image-list/image-list-item';
import { NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'dice-twice-master-materials',
  templateUrl: './master-materials.component.html',
  styleUrls: ['./master-materials.component.scss']
})
export class MasterMaterialsComponent implements OnInit {

  constructor(private media: MediaService, public service: RoomService, private rooms: RoomsService, private cache: CacheService) { }
  public files: ImageListItem[] = [];
  @ViewChild('filedrop') filedrop!:any;
  showCloseIndex:number|undefined;
  selected: ImageListItem|undefined;
  ngOnInit(): void {
    this.files = this.cache.find<ImageListItem>('master_list', {room:this.service.roomInfo?.Id}).sort((a,b) => a.index - b.index);
  }

  public dropped(files: NgxFileDropEntry[]) {
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file(async (file: File) => {
          const resolved = await this.media.resolveFile(file)
          const realFile:ImageListItem = {room:this.service.roomInfo?.Id ?? 0, index: this.files.length - 1, entry:droppedFile, file:resolved };
          this.files.push(realFile);
          // this.files.push(resolved);
          this.cache.insert('master_list',realFile);
          this.cache.saveState();
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  async show(index:number):Promise<void>{
    this.selected = this.files[index];
  }

  openImport(){
    this.filedrop.openFileSelector();
  }

  removeImage(index:number):void{
    this.files.splice(index,1);
    this.syncFiles();
  }

  syncFiles():void{
    this.cache.findAndRemove('master_list', {room:this.service.roomInfo?.Id});
    this.cache.insert('master_list', this.files);
  }

}
