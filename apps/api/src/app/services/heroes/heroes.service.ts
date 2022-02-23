import { Injectable } from '@nestjs/common';
import { DataBaseService } from '../data-base/data-base.service';
import { Hero } from './hero';
import { RoomsService } from '../rooms/rooms.service';

@Injectable()
export class HeroesService {
  constructor(private db: DataBaseService,
              private rooms: RoomsService) {
  }

  prepareHeroStats(input:Hero): Hero {
    const result = {...input};
    return result;
  }
}
