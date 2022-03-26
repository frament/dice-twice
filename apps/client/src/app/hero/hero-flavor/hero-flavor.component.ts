import { Component, Input, OnInit } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../../../../api/src/app/services/heroes/hero';

@Component({
  selector: 'dice-twice-hero-flavor',
  templateUrl: './hero-flavor.component.html',
  styleUrls: ['./hero-flavor.component.scss']
})
export class HeroFlavorComponent implements OnInit {

  constructor(private service: HeroService) { }

  @Input() hero!:Hero;
  ngOnInit(): void {}
  async updateStat(stat:string, value:string): Promise<void> {
    // @ts-ignore
    this.hero[stat] = value;
    await this.service.updateStat(this.hero.Id, {stat, value})
  }

}
