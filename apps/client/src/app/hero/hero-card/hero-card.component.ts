import { Component, Directive, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Hero } from '../../../../../api/src/app/services/heroes/hero';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'dice-twice-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent implements OnInit {

  constructor(private service: HeroService) { }

  @Input() hero!: Hero;
  @Input() mode: 'edit'|'show'|'mini'|'create' = 'show';

  ngOnInit(): void {
    console.log('cy');
  }

  async addHero():Promise<void>{
    await this.service.addHero(this.hero);
  }

  async updateHero():Promise<void>{
    await this.service.updateHero(this.hero.Id, this.hero);
  }

  async deleteHero():Promise<void>{
    await this.service.deleteHero(this.hero.Id);
  }

}
