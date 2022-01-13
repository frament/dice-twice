import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../../../../api/src/app/services/heroes/hero';

@Component({
  selector: 'dice-twice-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent implements OnInit {

  constructor() { }

  @Input() hero!: Hero;
  @Input() mode: 'edit'|'show'|'mini'|'create' = 'show';

  ngOnInit(): void {
  }

}
