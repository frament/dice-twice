import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { finalize, Subscription } from 'rxjs';
import { MediaService } from '../../services/media.service';

@Component({
  selector: 'dice-twice-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit, OnDestroy{

  @Input() requiredFileType!:string;
  @Input() info:any;
  @Input() actions: {code:string, name:string}[] = [];
  @Output() selectedFile: EventEmitter<number> = new EventEmitter<number>();
  @Output() actionEmited: EventEmitter<{code:string, name:string, fileId:number}> = new EventEmitter<{code:string, name:string, fileId:number}>();

  fileName = '';

  updateSub: Subscription|null = null;

  myFiles:any[] = [];
  imageToShow:any;

  constructor(private http: HttpClient,
              private media: MediaService) {}

  async ngOnInit(): Promise<void> {
    await this.updateMyFiles()
    this.updateSub = this.media.needUpdateFiles.subscribe(async () => await this.updateMyFiles());
  }

  ngOnDestroy() {
    this.updateSub?.unsubscribe();
  }

  async updateMyFiles(): Promise<void>{
    this.myFiles = this.info ?
      (await this.http.post('/api/media/find', this.info).toPromise()) as any[] :
      (await this.http.get('/api/media/my').toPromise()) as any[];
  }

  async getFile(id:number):Promise<void>{
    this.selectedFile.emit(id);
  }

  actionEmit(file:any, action:{code:string, name:string}){
    this.actionEmited.emit({...action,fileId:file.Id});
  }

  onFileSelected(event:any) {
    const file:File = event.target.files[0];
    if (file) {
      this.media.uploadFile(file, this.info);
    }
  }

}
