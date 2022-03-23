import { Component, Input, OnInit } from '@angular/core';
import { BaseStat, Hero } from '../../../../../api/src/app/services/heroes/hero';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'dice-twice-hero-saves',
  templateUrl: './hero-saves.component.html',
  styleUrls: ['./hero-saves.component.scss']
})
export class HeroSavesComponent implements OnInit {

  constructor(private service: HeroService,) { }
  @Input() hero!:Hero;

  ngOnInit(): void {}

  async updateSave(stat:BaseStat, value:string):Promise<void>{
    if (this.hero){
      this.hero.saves[stat] = value;
      await this.service.updateStat(this.hero.Id, { group:'saves', stat, value });
    }
  }

  async updateSaveSelect(stat:BaseStat, value:boolean):Promise<void>{
    if (this.hero){
      this.hero.savesSelected[stat] = value;
      await this.service.updateStat(this.hero.Id, { group:'savesSelected', stat, value });
    }
  }

}
