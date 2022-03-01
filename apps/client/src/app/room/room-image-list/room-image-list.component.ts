import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { MediaService } from '../../services/media.service';
import { RoomService } from '../room.service';
import { RoomsService } from '../../services/rooms.service';

@Component({
  selector: 'dice-twice-room-image-list',
  templateUrl: './room-image-list.component.html',
  styleUrls: ['./room-image-list.component.scss']
})
export class RoomImageListComponent implements OnInit {

  constructor(private media: MediaService, public service: RoomService, private rooms: RoomsService) { }
  public filesEntries: NgxFileDropEntry[] = [];
  public files: Array<string | ArrayBuffer | null> = [];
  mainShowData:any;

  ngOnInit(): void {
  }

  public dropped(files: NgxFileDropEntry[]) {
    console.log('dropped');
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        this.filesEntries.push(droppedFile);
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file(async (file: File) => {
          const resolved = await this.media.resolveFile(file)

          this.files.push(resolved);
          // Here you can access the real file
          console.log(droppedFile.relativePath, file);

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
      const image = this.files[index];
      const fileEntry = this.filesEntries[index].fileEntry as FileSystemFileEntry;
      this.service.mainShowData = image;
      this.service.sceneType.next('image');
      fileEntry.file(async Data => {
        const fileInfo = await this.media.uploadFile(Data,{room:this.service.roomInfo?.Id, type:'image'});
        await this.rooms.setMainShow(this.service.roomInfo?.Id ?? 0, { Type:'image', Data:fileInfo.Id});
      })
    }
  }


}
