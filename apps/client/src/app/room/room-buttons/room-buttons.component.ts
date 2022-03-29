import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

export type roomButtons = 'dice'|'hero'|'images'|'masterMaterials'|'wiki'|'notes'|'unicorn';

@Component({
  selector: 'dice-twice-room-buttons',
  templateUrl: './room-buttons.component.html',
  styleUrls: ['./room-buttons.component.scss']
})
export class RoomButtonsComponent implements OnInit, OnChanges {

  constructor() { }
  @Input() toShow: roomButtons[] = [];
  @Output() buttonClick: EventEmitter<roomButtons> = new EventEmitter<roomButtons>();

  shown:any = {};

  ngOnInit(): void {
    this.makeShown();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.makeShown();
  }

  makeShown(){
    this.shown = {};
    this.toShow?.forEach(x=> this.shown[x] = true);
  }

}
