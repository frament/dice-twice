import { Component, Input, OnInit } from '@angular/core';
import { HeroService } from '../../../services/hero.service';
import { Hero, HeroCombatStats } from '../../../../../../api/src/app/services/heroes/hero';

@Component({
  selector: 'dice-twice-hero-attacks-other',
  templateUrl: './hero-attacks-other.component.html',
  styleUrls: ['./hero-attacks-other.component.scss']
})
export class HeroAttacksOtherComponent implements OnInit {

  constructor(private service: HeroService) { }
  @Input() hero!:Hero;

  ngOnInit(): void {
  }

  async changeStat(value:string):Promise<void>{
    if (this.hero){
      this.hero.attacksOther = value;
      await this.service.updateStat(this.hero.Id, { stat:'attacksOther', value });
    }
  }

}
