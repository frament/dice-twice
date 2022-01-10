import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { finalize, Subscription } from 'rxjs';

@Component({
  selector: 'dice-twice-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit{

  @Input() requiredFileType!:string;

  fileName = '';
  uploadProgress:number|null = null;
  uploadSub: Subscription|null = null;

  myFiles:any[] = [];

  selectedFileId:number|undefined;

  imageToShow:any;

  constructor(private http: HttpClient) {}

  async ngOnInit(): Promise<void> {
    await this.updateMyFiles();
  }

  async updateMyFiles(): Promise<void>{
    this.myFiles = (await this.http.get('/api/media/my').toPromise()) as any[];
  }

  async getFile(id:number):Promise<void>{
    const file = (await this.http.get('/api/media/download/'+id, {responseType:'blob'}).toPromise()) as Blob;
    if (file){
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        this.imageToShow = reader.result;
      }, false);
      reader.readAsDataURL(file);
    }
  }

  async deleteFile(id:number):Promise<void>{
    await this.http.get('/api/media/delete/'+id).toPromise();
    await this.updateMyFiles();
  }

  onFileSelected(event:any) {
    const file:File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("thumbnail", file);
      const upload$ = this.http.post("/api/media/upload", formData, {
        reportProgress: true,
        observe: 'events'
      }).pipe(finalize(() => this.reset()));
      this.uploadSub = upload$.subscribe(event => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / (event.total ?? 1)));
        }
      })
    }
  }

  cancelUpload() {
    this.uploadSub?.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
    this.updateMyFiles();
  }

}
