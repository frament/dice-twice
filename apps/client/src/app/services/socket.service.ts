import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {io, Socket} from 'socket.io-client';
import {Observable} from 'rxjs';
import { addWarning } from '@angular-devkit/build-angular/src/utils/webpack-diagnostics';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket;

  constructor(private readonly http:HttpClient) {
    this.socket = io(window.location.protocol+'//'+window.location.hostname+':443', { transports: ['websocket'] });
  }

  on(event: string): Observable<any>{
    return new Observable<any>(observer => {
      this.socket?.on(event, (msg: any) => {
        observer.next(msg);
      });
    });
  }

  sub(event:string){
    this.socket.emit('subscribe',event);
  }

  unsub(event:string){
    this.socket.emit('unsubscribe',event);
  }

  async emit(message: string, data: any): Promise<void>{
    await this.http.post('/api/emit/'+message, data).toPromise();
  }
}
