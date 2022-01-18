import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {io, Socket} from 'socket.io-client';
import {Observable} from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket;

  constructor(private readonly http:HttpClient) {
    const socketUrl =  window.location.protocol+'//'+window.location.hostname + (environment.production ? '' : ':80')
    this.socket = io(socketUrl, { transports: ['websocket'] });
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

  async emitSocket(message: string, data: any): Promise<void>{
    this.socket.emit(message,data);
  }
}
