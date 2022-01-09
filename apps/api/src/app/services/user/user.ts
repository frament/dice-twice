export class User {
  constructor(input?:Partial<User>) {
    if (input) { Object.assign(this,input); }
  }
  Id:number;
  Name:string;
  Password:string;
}
