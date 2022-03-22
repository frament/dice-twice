import { Component, Input, OnInit } from '@angular/core';
import { BaseStat, Hero } from '../../../../api/src/app/services/heroes/hero';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'dice-twice-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  constructor(private user: UserService, private route:ActivatedRoute, private service: HeroService, private router: Router) { }

  hero: Hero|undefined;
  id: number|undefined;

  ngOnInit(): void {
    this.route.params.subscribe(async (params:any) => {
      if (params?.id && this.user.currentUser) {
        this.id = parseInt(params.id,10)
        this.hero = await this.service.getHero(this.id);
      }
    });
  }

  async updateMod(stat:BaseStat, value:string):Promise<void>{
    if (!!this.id && !!this.hero){
      this.hero.scoresMod[stat] = value;
      await this.service.updateStat(this.id, { group:'scoresMod', stat, value });
    }
  }
  async updateScore(stat:BaseStat, value:number):Promise<void>{
    if (!!this.id && !!this.hero){
      this.hero.scores[stat] = value;
      await this.service.updateStat(this.id, { group:'scores', stat, value });
    }
  }

  async deleteHero():Promise<void>{
    if (this.id){
      await this.service.deleteHero(this.id);
      await this.router.navigateByUrl('/');
    }
  }
}
