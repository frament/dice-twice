import { Injectable } from '@nestjs/common';
import * as Loki from 'lokijs';
import { LokiFsAdapter } from 'lokijs';
import { User } from '../user/user';

@Injectable()
export class DataBaseService {
  db = new Loki('sandbox.db', {adapter: new LokiFsAdapter()});
  tables:{name:string, options?: Partial<CollectionOptions<any>>}[] = [
    {name:'users', options:{unique:['Id','Name'], autoupdate: true}},
    {name:'rooms', options:{unique:['Id'], autoupdate: true}},
    {name:'heroes', options:{unique:['Id'], autoupdate: true}},
    {name:'files', options:{unique:['Id'], indices:['UserId'], autoupdate: true}}
  ];
  async init(): Promise<void>{
    return new Promise<void>(resolve => {
      this.db.loadDatabase({},()=>{
        for (const table of this.tables){
          if (!this.db.getCollection(table.name)){
            this.db.addCollection(table.name, table.options);
          }
        }
        if (!this.db.getCollection('users').find({}).length){
          this.firstStart();
        }
        setInterval(() => {
          if (this.checkDirty()){
            this.db.saveDatabase();
            console.log('dbSaved');
          }
        }, 5000);
        resolve();
      })
    })
  }

  getCollection<F extends object = any>(name:string):Collection<F>{
    return this.db.getCollection<F>(name);
  }

  getNextId(collection:string): number {
    const max = this.db.getCollection(collection).max('Id')
    return max === Infinity || max === -Infinity || !max ? 1 : max + 1;
  }

  save():Promise<void>{
    return new Promise<void>(resolve => {
      this.db.saveDatabase(()=>resolve());
    })
  }

  checkDirty():boolean{
    return this.db.autosaveDirty();
  }

  firstStart(){
    this.db.getCollection<User>('users').insert({ Email: '', Id: 1, Name: 'master', Password: '123' });
    this.db.getCollection<User>('users').insert({ Email: '', Id: 2, Name: 'player', Password: '123' });
    this.db.getCollection<User>('users').insert({ Email: '', Id: 3, Name: 'watcher', Password: '123' });
  }

}
