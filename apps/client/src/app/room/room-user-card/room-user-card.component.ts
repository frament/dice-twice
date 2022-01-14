import { Component, Input, OnInit } from '@angular/core';
import { PlayerHero } from '../../../../../api/src/app/services/heroes/hero';

@Component({
  selector: 'dice-twice-room-user-card',
  templateUrl: './room-user-card.component.html',
  styleUrls: ['./room-user-card.component.scss']
})
export class RoomUserCardComponent implements OnInit {

  constructor() { }

  @Input() player!: PlayerHero;

  ngOnInit(): void {
  }

}
