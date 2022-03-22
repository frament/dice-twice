import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../../../../api/src/app/services/heroes/hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private readonly http:HttpClient) {}

  addHero(hero:Partial<Hero>):Promise<Hero>{
    return this.http.post('/api/hero/add/', hero).toPromise() as Promise<Hero>;
  }

  updateHero(id:number, hero:Partial<Hero>):Promise<Hero>{
    return this.http.post('/api/hero/update/'+id, hero).toPromise() as Promise<Hero>;
  }
  updateStat(id:number,upd:{group?:string, stat:string, value:any}): Promise<Hero> {
    return this.http.post('/api/hero/updateStat/'+id, upd).toPromise() as Promise<Hero>;
  }

  async deleteHero(id:number):Promise<void> {
    await this.http.get('/api/hero/delete/'+ id).toPromise();
  }

  getHero(id:number): Promise<Hero>{
    return this.http.get('/api/hero/get/'+ id).toPromise() as Promise<Hero>;
  }

  getMyHeroes(): Promise<Hero[]>{
    return this.http.get('/api/hero/my').toPromise() as Promise<Hero[]>;
  }


}
