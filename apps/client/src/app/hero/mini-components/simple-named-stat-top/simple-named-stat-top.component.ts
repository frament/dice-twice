import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'dice-twice-simple-named-stat-top',
  templateUrl: './simple-named-stat-top.component.html',
  styleUrls: ['./simple-named-stat-top.component.scss']
})
export class SimpleNamedStatTopComponent implements OnInit {

  constructor() { }
  @Input() name!:string;
  @Input() value!:string|number;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
  }

}
