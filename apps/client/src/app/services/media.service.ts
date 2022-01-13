import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { finalize, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private http: HttpClient) { }
  needUpdateFiles: Subject<void> = new Subject<void>();
  uploadProgress:number|null = null;
  uploadSub: Subscription|null = null;

  getFile(id:number):Promise<string | ArrayBuffer | null>{
    return new Promise<any>(async resolve => {
      const file = (await this.http.get('/api/media/download/'+id, {responseType:'blob'}).toPromise()) as Blob;
      if (file){
        let reader = new FileReader();
        reader.addEventListener("load", () => {
          resolve(reader.result);
        }, false);
        reader.readAsDataURL(file);
      }
    })
  }

  async deleteFile(id:number):Promise<void>{
    await this.http.get('/api/media/delete/'+id).toPromise();
    this.needUpdateFiles.next();
  }

  uploadFile(file:any, info?:any){
    const formData = new FormData();
    formData.append("thumbnail", file);
    if (info){
      formData.append('info',JSON.stringify(info));
    }
    const upload$ = this.http.post("/api/media/upload", formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(finalize(() => this.resetUpload()));
    this.uploadSub = upload$.subscribe(event => {
      if (event.type == HttpEventType.UploadProgress) {
        this.uploadProgress = Math.round(100 * (event.loaded / (event.total ?? 1)));
      }
    })
  }

  resetUpload() {
    this.uploadProgress = null;
    this.uploadSub = null;
    this.needUpdateFiles.next();
  }

}
