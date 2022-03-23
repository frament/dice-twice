import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'dice-twice-simple-named-stat',
  templateUrl: './simple-named-stat.component.html',
  styleUrls: ['./simple-named-stat.component.scss']
})
export class SimpleNamedStatComponent implements OnInit {

  constructor() { }
  @Input() name!:string;
  @Input() value!:string|number;
  @Output() valueChange: EventEmitter<string|number> = new EventEmitter<string|number>();

  ngOnInit(): void {}

}
