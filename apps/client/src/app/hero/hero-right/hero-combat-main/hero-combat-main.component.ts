import { Component, Input, OnInit } from '@angular/core';
import { BaseStat, Hero, HeroCombatStats } from '../../../../../../api/src/app/services/heroes/hero';
import { HeroService } from '../../../services/hero.service';

@Component({
  selector: 'dice-twice-hero-combat-main',
  templateUrl: './hero-combat-main.component.html',
  styleUrls: ['./hero-combat-main.component.scss']
})
export class HeroCombatMainComponent implements OnInit {

  constructor(private service: HeroService) { }
  @Input() hero!:Hero;

  ngOnInit(): void {
  }

  async updateStat(stat:keyof HeroCombatStats, value:string, type:'string'|'number'):Promise<void>{
    if (this.hero){
      // @ts-ignore
      this.hero.combat[stat] = type === 'number' ? parseInt(value ?? 0, 10) : value+'';
      await this.service.updateStat(this.hero.Id, { group:'combat', stat, value });
    }
  }

}
