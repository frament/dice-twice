import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../../../../../api/src/app/services/heroes/hero';
import { HeroService } from '../../../services/hero.service';

@Component({
  selector: 'dice-twice-hero-misc',
  templateUrl: './hero-misc.component.html',
  styleUrls: ['./hero-misc.component.scss']
})
export class HeroMiscComponent implements OnInit {

  constructor(private service: HeroService) { }

  @Input() hero!:Hero;
  parseInt = parseInt;

  ngOnInit(): void {
  }

  async updateStat(stat:string, value:any): Promise<void> {
    // @ts-ignore
    this.hero.misc[stat] = value;
    await this.service.updateStat(this.hero.Id, {group:'misc', stat, value})
  }

}
