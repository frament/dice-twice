import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../../../../api/src/app/services/heroes/hero';
import { FullRoomInfo } from '../../../../api/src/app/services/rooms/full-room-info';
import { Room } from '../../../../api/src/app/services/rooms/room';

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

  async deleteHero(id:number):Promise<void> {
    await this.http.get('/api/hero/delete/'+ id).toPromise();
  }

  getHero(id:string): Promise<Hero>{
    return this.http.get('/api/hero/get/'+ id).toPromise() as Promise<Hero>;
  }


}
