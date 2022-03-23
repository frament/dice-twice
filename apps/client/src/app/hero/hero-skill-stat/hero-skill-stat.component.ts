import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'dice-twice-hero-skill-stat',
  templateUrl: './hero-skill-stat.component.html',
  styleUrls: ['./hero-skill-stat.component.scss']
})
export class HeroSkillStatComponent implements OnInit {

  constructor() { }
  @Input() name!:string;
  @Input() selected!:boolean;
  @Input() value!:string;
  @Output() selectedChange:EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() valueChange:EventEmitter<string> = new EventEmitter<string>()

  ngOnInit(): void {
  }

  updateSelected():void{
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
  }
  updateValue():void{
    this.valueChange.emit(this.value);
  }

}
