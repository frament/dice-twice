import { Component, Input, OnInit } from '@angular/core';
import { HeroService } from '../../../services/hero.service';
import { Hero, HeroCombatStats } from '../../../../../../api/src/app/services/heroes/hero';

@Component({
  selector: 'dice-twice-hero-attacks',
  templateUrl: './hero-attacks.component.html',
  styleUrls: ['./hero-attacks.component.scss']
})
export class HeroAttacksComponent implements OnInit {

  constructor(private service: HeroService) { }
  @Input() hero!:Hero;

  ngOnInit(): void {
  }

  async changeStat():Promise<void>{
    if (this.hero){
      await this.service.updateStat(this.hero.Id, { stat:'attacks', value:this.hero.attacks });
    }
  }

  async addAttack():Promise<void>{
    this.hero.attacks.push({atkname:'',atkbonus:'',atkdamage:''});
    await this.service.updateStat(this.hero.Id, { stat:'attacks', value:this.hero.attacks });
  }

  async deleteAttack(index:number):Promise<void>{
    this.hero.attacks.splice(index,1);
    await this.service.updateStat(this.hero.Id, { stat:'attacks', value:this.hero.attacks });
  }



}
