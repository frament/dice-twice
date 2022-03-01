import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FullRoomInfo } from '../../../../api/src/app/services/rooms/full-room-info';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  constructor() { }
  sceneType: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  mainShowData:any;
  roomInfo:FullRoomInfo|undefined;
}
