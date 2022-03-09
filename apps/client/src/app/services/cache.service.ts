import { Injectable } from '@angular/core';
import * as Loki from 'lokijs';
// @ts-ignore
import * as LokiIndexedAdapter from 'lokijs/src/loki-indexed-adapter';
import { FileListItem } from '../room/room-image-list/file-list-item';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  constructor() { }
  db = new Loki('cache.db', {adapter: new LokiIndexedAdapter()});
  initStorage<F extends object = any>(name: string, options?: Partial<CollectionOptions<any>>): Collection<F>{
    const result = this.db.getCollection(name) ?? this.db.addCollection<F>(name, options);
    this.saveState();
    return result as Collection<F>;
  }

  clearStorage(name: string): void {
    this.getStorage(name).clear();
    this.saveState();
  }

  private getStorage(name: string): Collection<any> {
    return this.db.getCollection(name) ?? this.initStorage(name);
  }

  async init(): Promise<void> {
    await this.loadDB();
    this.initDefaultStorages();
  }

  initDefaultStorages(): void {
    this.initStorage<FileListItem>('image_list', { indices: ['index','room'] });
    this.initStorage<FileListItem>('master_list', { indices: ['index','room'] });
    this.initStorage<{key:string, value:string}>('kv', { unique: ['key'] });
  }

  saveState(): void {
    this.db.saveDatabase();
  }

  private loadDB(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.db.loadDatabase({}, () => { resolve(); });
    });
  }

  cleanLokiFields(item: any|any[]): any|any[] {
    if (Array.isArray(item)){
      return item.map(x => {
        const result = {...x};
        // tslint:disable-next-line:no-string-literal
        if (result['$loki']) { delete result['$loki']; }
        // tslint:disable-next-line:no-string-literal
        if (result['meta']) { delete result['meta']; }
        return result;
      });
    } else {
      const result = {...item};
      // tslint:disable-next-line:no-string-literal
      if (result['$loki']) { delete result['$loki']; }
      // tslint:disable-next-line:no-string-literal
      if (result['meta']) { delete result['meta']; }
      return result;
    }
  }

  insert<F extends object = any>(collection: string, items: F|F[], ignoreDoubles?: boolean ): F|F[] {
    let result;
    const clenaedItems = this.cleanLokiFields(items);
    try {
      result = this.getStorage(collection).insert(clenaedItems);
    } catch (e) {
      if (!ignoreDoubles){
        console.error(collection, e);
      }
    }
    this.saveState();
    return result;
  }

  find<F extends object = any>(collection: string, query: any ): F[] {
    return this.getStorage(collection).find(query);
  }

  by<F extends object = any>(collection: string, key: string, val: any ): F {
    return this.getStorage(collection).by(key, val);
  }

  update<F extends object = any>(collection: string, update: F| F[] ): F|F[]{
    const result = this.getStorage(collection).update(update);
    this.saveState();
    return result;
  }

  remove(collection: string, remove: any| any[] ): any{
    const result = this.getStorage(collection).remove(remove);
    this.saveState();
    return result;
  }

  findAndUpdate<F extends object = any>(collection: string, query: any, update: any): void {
    this.getStorage(collection).findAndUpdate(query, (x:F)=>Object.assign(x,update));
    this.saveState();
  }

  findAndRemove(collection: string, query: any): void {
    this.getStorage(collection).findAndRemove(query);
    this.saveState();
  }

  listCollections(): Collection<any>[]{
    return this.db.listCollections();
  }

  collectionHasData(code: string): boolean {
    return (this.getStorage(code)?.data?.length ?? 0) > 0;
  }
}
