export class Hero {
  constructor(input?:Partial<Hero>) {
    if (input) { Object.assign(this,input); }
  }
  Id:number;
  Name:string;
  IdUser:number;
}
