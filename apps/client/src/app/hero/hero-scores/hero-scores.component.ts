import { Component, Input, OnInit } from '@angular/core';
import { BaseStat, Hero } from '../../../../../api/src/app/services/heroes/hero';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'dice-twice-hero-scores',
  templateUrl: './hero-scores.component.html',
  styleUrls: ['./hero-scores.component.scss']
})
export class HeroScoresComponent implements OnInit {

  constructor(private service: HeroService) { }
  @Input() hero!:Hero;

  ngOnInit(): void {}

  async updateMod(stat:BaseStat, value:string):Promise<void>{
    if (this.hero){
      this.hero.scoresMod[stat] = value;
      await this.service.updateStat(this.hero.Id, { group:'scoresMod', stat, value });
    }
  }
  async updateScore(stat:BaseStat, value:number):Promise<void>{
    if (this.hero){
      this.hero.scores[stat] = value;
      await this.service.updateStat(this.hero.Id, { group:'scores', stat, value });
    }
  }

}
