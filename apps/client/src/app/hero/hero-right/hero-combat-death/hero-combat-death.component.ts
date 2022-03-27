import { Component, Input, OnInit } from '@angular/core';
import { HeroService } from '../../../services/hero.service';
import { Hero, HeroCombatStats } from '../../../../../../api/src/app/services/heroes/hero';

@Component({
  selector: 'dice-twice-hero-combat-death',
  templateUrl: './hero-combat-death.component.html',
  styleUrls: ['./hero-combat-death.component.scss']
})
export class HeroCombatDeathComponent implements OnInit {

  constructor(private service: HeroService) { }
  @Input() hero!:Hero;

  ngOnInit(): void {
  }

  async changeStat(stat:keyof HeroCombatStats, value:boolean):Promise<void>{
    if (this.hero){
      // @ts-ignore
      this.hero.combat[stat] = value;
      await this.service.updateStat(this.hero.Id, { group:'combat', stat, value });
    }
  }

}
