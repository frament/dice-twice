import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaService } from '../../services/media.service';
import { RoomService } from '../room.service';
import { RoomsService } from '../../services/rooms.service';
import { CacheService } from '../../services/cache.service';
import { FileListItem } from '../room-image-list/file-list-item';
import { NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'dice-twice-master-materials',
  templateUrl: './master-materials.component.html',
  styleUrls: ['./master-materials.component.scss']
})
export class MasterMaterialsComponent implements OnInit {

  constructor(private media: MediaService, public service: RoomService, private rooms: RoomsService, private cache: CacheService) { }
  public files: FileListItem[] = [];
  @ViewChild('filedrop') filedrop!:any;
  showCloseIndex:number|undefined;
  selected: FileListItem|undefined;
  roomId:number = 0;
  ngOnInit(): void {
    this.rooms.currentRoomInfo.subscribe(x=> this.roomId = x?.Id ?? 0);
    this.files = this.cache.find<FileListItem>('master_list', {room:this.service.roomInfo?.Id}).sort((a, b) => a.index - b.index);
  }

  public dropped(files: NgxFileDropEntry[]) {
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file(async (file: File) => {
          const resolved = await this.media.resolveFile(file)
          const realFile:FileListItem = {room:this.roomId, index: this.files.length - 1, file:resolved, type:file.type};
          const fileInfo = await this.media.uploadFile(file,{room:this.roomId, type:'image'});
          // @ts-ignore
          realFile.cachedId = fileInfo.Id;
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
    this.cache.findAndRemove('master_list', {room:this.roomId});
    this.cache.insert('master_list', this.files);
  }

}
