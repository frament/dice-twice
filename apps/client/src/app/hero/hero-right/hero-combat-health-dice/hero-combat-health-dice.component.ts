import { Component, Input, OnInit } from '@angular/core';
import { HeroService } from '../../../services/hero.service';
import { Hero, HeroCombatStats } from '../../../../../../api/src/app/services/heroes/hero';

@Component({
  selector: 'dice-twice-hero-combat-health-dice',
  templateUrl: './hero-combat-health-dice.component.html',
  styleUrls: ['./hero-combat-health-dice.component.scss']
})
export class HeroCombatHealthDiceComponent implements OnInit {

  constructor(private service: HeroService) { }
  @Input() hero!:Hero;

  ngOnInit(): void {
  }

  async changeStat(stat:keyof HeroCombatStats, value:string):Promise<void>{
    if (this.hero){
      // @ts-ignore
      this.hero.combat[stat] = value;
      await this.service.updateStat(this.hero.Id, { group:'combat', stat, value });
    }
  }

}
