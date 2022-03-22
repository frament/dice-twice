import { Component, OnInit } from '@angular/core';
import { Hero } from '../../../../../api/src/app/services/heroes/hero';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'dice-twice-room-hero',
  templateUrl: './room-hero.component.html',
  styleUrls: ['./room-hero.component.scss']
})
export class RoomHeroComponent implements OnInit {

  constructor(private service: HeroService) { }
  hero: Hero|undefined;
  async ngOnInit(): Promise<void> {
    this.hero = await this.service.getHero(parseInt('1',10));
  }

}
