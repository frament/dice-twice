import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'dice-twice-hero-money-counter',
  templateUrl: './hero-money-counter.component.html',
  styleUrls: ['./hero-money-counter.component.scss']
})
export class HeroMoneyCounterComponent implements OnInit {

  constructor() { }
  @Input() name!:string;
  @Input() amount!:number;
  @Output() amountChange: EventEmitter<number> = new EventEmitter<number>()

  ngOnInit(): void {
  }

}
