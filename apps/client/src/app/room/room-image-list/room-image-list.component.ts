import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { MediaService } from '../../services/media.service';
import { RoomService } from '../room.service';
import { RoomsService } from '../../services/rooms.service';
import { CacheService } from '../../services/cache.service';
import { FileListItem } from './file-list-item';

@Component({
  selector: 'dice-twice-room-image-list',
  templateUrl: './room-image-list.component.html',
  styleUrls: ['./room-image-list.component.scss']
})
export class RoomImageListComponent implements OnInit {

  constructor(private media: MediaService, public service: RoomService, private rooms: RoomsService, private cache: CacheService) { }
  public files: FileListItem[] = [];
  @ViewChild('filedrop') filedrop!:any;
  showCloseIndex:number|undefined;

  roomId:number = 0;
  ngOnInit(): void {
    this.rooms.currentRoomInfo.subscribe(x=> this.roomId = x?.Id ?? 0);
    this.files = this.cache.find<FileListItem>('image_list', {room:this.service.roomInfo?.Id}).sort((a, b) => a.index - b.index);
  }

  public dropped(files: NgxFileDropEntry[]) {
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file(async (file: File) => {
          const resolved = await this.media.resolveFile(file)
          const realFile:FileListItem = {room:this.roomId, index: this.files.length - 1, file:resolved, type:file.type };
          const fileInfo = await this.media.uploadFile(file,{room:this.roomId, type:'image'});
          // @ts-ignore
          realFile.cachedId = fileInfo.Id;
          this.files.push(realFile);
          this.cache.insert('image_list',realFile);
          this.cache.saveState();
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
  async setMainImage(index:number):Promise<void>{
    if (this.roomId){
      this.service.mainShowData = this.files[index].file;
      this.service.sceneType.next('image');
      // @ts-ignore
      await this.rooms.setMainShow(this.roomId, { Type:'image', Data:this.files[index].cachedId});
    }
  }

  openImport(){
    this.filedrop.openFileSelector();
  }

  removeImage(index:number):void{
    this.files.splice(index,1);
    this.syncFiles();
  }

  syncFiles():void{
    this.cache.findAndRemove('image_list', {room:this.service.roomInfo?.Id});
    this.cache.insert('image_list', this.files);
  }

}
