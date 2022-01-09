export class Room {
  constructor(input?:Partial<Room>) {
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
  state: 'game'|'ready'|'pause'|'not_ready' = 'not_ready';
}
