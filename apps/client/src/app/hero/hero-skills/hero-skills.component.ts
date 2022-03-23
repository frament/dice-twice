import { Component, Input, OnInit } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { BaseStat, Hero, skillsCodes } from '../../../../../api/src/app/services/heroes/hero';

@Component({
  selector: 'dice-twice-hero-skills',
  templateUrl: './hero-skills.component.html',
  styleUrls: ['./hero-skills.component.scss']
})
export class HeroSkillsComponent implements OnInit {

  constructor(private service: HeroService,) { }
  @Input() hero!:Hero;
  ngOnInit(): void {
  }
  async updateSave(stat:skillsCodes, value:string):Promise<void>{
    if (this.hero){
      this.hero.skills[stat] = value;
      await this.service.updateStat(this.hero.Id, { group:'skills', stat, value });
    }
  }

  async updateSaveSelect(stat:skillsCodes, value:boolean):Promise<void>{
    if (this.hero){
      this.hero.skillsSelected[stat] = value;
      await this.service.updateStat(this.hero.Id, { group:'skillsSelected', stat, value });
    }
  }
}
