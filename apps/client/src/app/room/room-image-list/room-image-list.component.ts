import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { MediaService } from '../../services/media.service';
import { RoomService } from '../room.service';
import { RoomsService } from '../../services/rooms.service';
import { CacheService } from '../../services/cache.service';
import { ImageListItem } from './image-list-item';

@Component({
  selector: 'dice-twice-room-image-list',
  templateUrl: './room-image-list.component.html',
  styleUrls: ['./room-image-list.component.scss']
})
export class RoomImageListComponent implements OnInit {

  constructor(private media: MediaService, public service: RoomService, private rooms: RoomsService, private cache: CacheService) { }
  // public filesEntries: NgxFileDropEntry[] = [];
  // public files: Array<string | ArrayBuffer | null> = [];
  public files: ImageListItem[] = [];
  @ViewChild('filedrop') filedrop!:any;
  mainShowData:any;

  ngOnInit(): void {
    this.files = this.cache.find<ImageListItem>('image_list', {room:this.service.roomInfo?.Id}).sort((a,b) => a.index - b.index);
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
          this.cache.insert('image_list',realFile);
          this.cache.saveState();
          this.mainShowData = file;
          /**
           // You could upload it like this:
           const formData = new FormData()
           formData.append('logo', file, relativePath)

           // Headers
           const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

           this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
           .subscribe(data => {
            // Sanitized logo returned from backend
          })
           **/

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
  async setMainImage(index:number):Promise<void>{
    if (this.service.roomInfo?.Id){
      const image = this.files[index].file;
      const fileEntry = this.files[index].entry.fileEntry as FileSystemFileEntry;
      this.service.mainShowData = image;
      this.service.sceneType.next('image');
      fileEntry.file(async Data => {
        const fileInfo = await this.media.uploadFile(Data,{room:this.service.roomInfo?.Id, type:'image'});
        await this.rooms.setMainShow(this.service.roomInfo?.Id ?? 0, { Type:'image', Data:fileInfo.Id});
      })
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
