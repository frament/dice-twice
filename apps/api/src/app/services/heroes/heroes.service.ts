import { Injectable } from '@nestjs/common';
import { DataBaseService } from '../data-base/data-base.service';
import { Hero } from './hero';
import { RoomsService } from '../rooms/rooms.service';

@Injectable()
export class HeroesService {
  constructor(private db: DataBaseService,
              private rooms: RoomsService) {
  }

  addHero(hero:Partial<Hero>, idRoom?:number): Hero {
    const heroRes = this.db.db.getCollection('heroes').insert(new Hero({...hero, Id:this.db.getNextId('heroes')}));
    if (!!idRoom){
      this.rooms.addHeroToRoom(idRoom, hero.Id);
    }
    return heroRes;
  }
}
