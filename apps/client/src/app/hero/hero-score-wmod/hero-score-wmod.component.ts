import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'dice-twice-hero-score-wmod',
  templateUrl: './hero-score-wmod.component.html',
  styleUrls: ['./hero-score-wmod.component.scss']
})
export class HeroScoreWModComponent implements OnInit {

  constructor() { }
  @Input() name!:string;
  @Input() score!:number;
  @Input() mod!:string;
  @Output() scoreChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() modChange: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
  }

}
