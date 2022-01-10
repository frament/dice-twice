export class User {
  constructor(input?:Partial<User>) {
    if (input) { Object.assign(this,input); }
  }
  Id:number = 0;
  Name:string = '';
  Password:string = '';
  Email:string = '';
}
