export class Hero {
  constructor(input?:Partial<Hero>) {
    if (input) { Object.assign(this,input); }
  }
  Id:number = 0;
  Name:string = '';
  IdUser:number = 0;
}
