import { Injectable } from '@nestjs/common';
import * as Loki from 'lokijs';
import { LokiFsAdapter } from 'lokijs';

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

  getNextId(collection:string): number {
    const max = this.db.getCollection(collection).max('Id')
    return max === Infinity || max === -Infinity ? 0 : max + 1;
  }

  save():Promise<void>{
    return new Promise<void>(resolve => {
      this.db.saveDatabase(()=>resolve());
    })
  }

  checkDirty():boolean{
    return this.db.autosaveDirty();
  }

}
