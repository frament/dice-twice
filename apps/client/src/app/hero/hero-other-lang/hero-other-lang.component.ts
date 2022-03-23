import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../../../../api/src/app/services/heroes/hero';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'dice-twice-hero-other-lang',
  templateUrl: './hero-other-lang.component.html',
  styleUrls: ['./hero-other-lang.component.scss']
})
export class HeroOtherLangComponent implements OnInit {

  constructor(private service: HeroService) { }
  @Input() hero!: Hero;

  ngOnInit(): void {
  }

  async changeStat(value:string):Promise<void>{
    if (this.hero){
      this.hero.otherprofs = value;
      await this.service.updateStat(this.hero.Id, { stat: 'otherprofs', value });
    }
  }

}
