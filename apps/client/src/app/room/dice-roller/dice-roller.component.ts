import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dice-twice-dice-roller',
  templateUrl: './dice-roller.component.html',
  styleUrls: ['./dice-roller.component.scss']
})
export class DiceRollerComponent implements OnInit {

  constructor() { }
  diceTypes = ['d2','d4','d6','d8','d10','d12','d20','d100'];
  selectedType:'d2'|'d4'|'d6'|'d8'|'d10'|'d12'|'d20'|'d100'= 'd20';
  rolledValue:number = 0;
  ngOnInit(): void {
    this.roll();
  }
  roll(){
    switch (this.selectedType) {
      case 'd2': this.rolledValue = 1 + Math.floor(Math.random()); break;
      case 'd4': this.rolledValue = 1 + Math.floor(Math.random() * 3); break;
      case 'd6': this.rolledValue = 1 + Math.floor(Math.random() * 5); break;
      case 'd8': this.rolledValue = 1 + Math.floor(Math.random() * 7); break;
      case 'd10': this.rolledValue = 1 + Math.floor(Math.random() * 9); break;
      case 'd12': this.rolledValue = 1 + Math.floor(Math.random() * 11); break;
      case 'd20': this.rolledValue = 1 + Math.floor(Math.random() * 19); break;
      case 'd100': this.rolledValue = 1 + Math.floor(Math.random() * 99); break;
    }
  };

}
