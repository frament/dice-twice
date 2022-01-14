import { FullRoomInfo } from './full-room-info';

export type Room = Pick<FullRoomInfo, 'Id'|'Name'|'state'>
export interface RoomMainShow{
  Type:'image'|undefined;
  Data:any;
}
export type roomStates = 'game'|'ready'|'pause'|'not_ready';
export interface RoomAudio {
  currentFile: number;
  currentPosition: number;
  playlist?:number[];
}
