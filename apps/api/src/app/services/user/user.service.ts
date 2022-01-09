import { Injectable } from '@nestjs/common';
import { DataBaseService } from '../data-base/data-base.service';
import { User } from './user';

@Injectable()
export class UserService {

  constructor(private db: DataBaseService) {
  }

  createUser(user:Partial<User>){
    const Id = this.db.getNextId('users');
    this.db.db.getCollection('users').insert({...user, Id});
  }

  changePassword(username: string, newPass:string):void{
    const user = this.db.db.getCollection('users').by('Name',username);
    user.Password = newPass;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.db.db.getCollection('users').by('Name',username);
  }
}
