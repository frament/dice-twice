import { Component, Input, OnInit } from '@angular/core';
import { BaseStat, Hero, skillsCodes } from '../../../../api/src/app/services/heroes/hero';
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

  async deleteHero():Promise<void>{
    if (this.id){
      await this.service.deleteHero(this.id);
      await this.router.navigateByUrl('/');
    }
  }
  async changeStat(valueInput:string|number|boolean, stat:string, type:'string'|'number'|'boolean', group?:string):Promise<void>{
    if (this.hero){
      let value = valueInput;
      switch (type) {
        case 'string' : value = valueInput+''; break;
        case 'number' : value = parseInt(valueInput+'', 10); break;
        case 'boolean' : value = valueInput+'' === 'true'; break;
      }
      if (group){
        // @ts-ignore
        this.hero[group][stat] = value;
        await this.service.updateStat(this.hero.Id, { group, stat, value });
      } else {
        // @ts-ignore
        this.hero[stat] = value;
        await this.service.updateStat(this.hero.Id, { stat, value });
      }
    }
  }
}
