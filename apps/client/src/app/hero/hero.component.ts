import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../../../api/src/app/services/heroes/hero';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'dice-twice-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  constructor(private user: UserService, private route:ActivatedRoute, private service: HeroService) { }

  hero: Hero|undefined;
  mode: 'edit'|'show'|'mini'|'create' = 'edit';

  ngOnInit(): void {
    this.route.params.subscribe(async (params:any) => {
      if (params?.id === 'new' && this.user.currentUser) {
        this.hero = new Hero({IdUser: this.user.currentUser.userId, Id:undefined});
      } else if (params?.id && this.user.currentUser) {
        this.hero = await this.service.getHero(params.id);
      }
    });
  }

}
