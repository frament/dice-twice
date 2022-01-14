import { RoomAudio, RoomMainShow, roomStates } from './room';

export class FullRoomInfo {
  constructor(input?:Partial<FullRoomInfo>) {
    if (input) { Object.assign(this,input); }
  }
  Id:number = 0;
  Name:string = '';
  IsPassword: boolean = false;
  Password?:string;
  Master: number = 0;
  Players: {playerId:number, heroId:number}[] = [];
  Watchers: number[] = [];
  state:roomStates = 'not_ready';
  mainShow?:RoomMainShow;
  audio?:RoomAudio;
}
