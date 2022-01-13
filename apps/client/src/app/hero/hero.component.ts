import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../../../api/src/app/services/heroes/hero';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dice-twice-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  constructor(private user: UserService, private route:ActivatedRoute, ) { }

  hero: Hero|undefined;
  mode = 'edit';

  ngOnInit(): void {
    this.route.params.subscribe(async (params:any) => {
      if (params?.id === 'new' && this.user.currentUser) {
        this.hero = new Hero({IdUser: this.user.currentUser.userId});
      } else if (params?.id && this.user.currentUser) {
        this.hero = await this.hero
      }
    });
  }

}
