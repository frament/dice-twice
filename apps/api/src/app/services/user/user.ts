export class User {
  constructor(input?:Partial<User>) {
    if (input) { Object.assign(this,input); }
  }
  Id:number = 0;
  Name:string = '';
  Password:string = '';
  Email:string = '';
}

export type UserLight = Pick<User, 'Id'|'Name'>;
export type UserLightKeys = keyof UserLight;
