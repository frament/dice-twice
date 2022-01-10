export type roomStates = 'game'|'ready'|'pause'|'not_ready';

export class FullRoomInfo {
  constructor(input?:Partial<FullRoomInfo>) {
    if (input) { Object.assign(this,input); }
  }
  Id:number = 0;
  Name:string = '';
  IsPassword: boolean = false;
  Password?:string;
  Master: number = 0;
  Players: number[] = [];
  Watchers: number[] = [];
  Heroes: number[] = [];
  state:roomStates = 'not_ready';
}
