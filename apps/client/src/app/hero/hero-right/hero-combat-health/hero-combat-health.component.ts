import { Component, Input, OnInit } from '@angular/core';
import { Hero, HeroCombatStats } from '../../../../../../api/src/app/services/heroes/hero';
import { HeroService } from '../../../services/hero.service';

@Component({
  selector: 'dice-twice-hero-combat-health',
  templateUrl: './hero-combat-health.component.html',
  styleUrls: ['./hero-combat-health.component.scss']
})
export class HeroCombatHealthComponent implements OnInit {

  constructor(private service: HeroService) { }
  @Input() hero!:Hero;

  ngOnInit(): void {
  }

  async changeStat(stat:keyof HeroCombatStats, value:number):Promise<void>{
    if (this.hero){
      // @ts-ignore
      this.hero.combat[stat] = value;
      await this.service.updateStat(this.hero.Id, { group:'combat', stat, value });
    }
  }

}
