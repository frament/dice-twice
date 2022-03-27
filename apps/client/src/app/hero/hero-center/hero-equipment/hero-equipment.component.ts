import { Component, Input, OnInit } from '@angular/core';
import { HeroService } from '../../../services/hero.service';
import { Hero } from '../../../../../../api/src/app/services/heroes/hero';

@Component({
  selector: 'dice-twice-hero-equipment',
  templateUrl: './hero-equipment.component.html',
  styleUrls: ['./hero-equipment.component.scss']
})
export class HeroEquipmentComponent implements OnInit {

  constructor(private service: HeroService) { }
  @Input() hero!: Hero;

  ngOnInit(): void {
  }

  async changeStat(stat:string, value:any):Promise<void>{
    if (this.hero){
      // @ts-ignore
      this.hero.equipment[stat] = value;
      await this.service.updateStat(this.hero.Id, { group: 'equipment', stat, value });
    }
  }

}
