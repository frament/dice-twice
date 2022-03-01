import { Component, OnInit } from '@angular/core';
import { RoomService } from '../room.service';
import { SubHelper } from '../../sub-helper';

@Component({
  selector: 'dice-twice-room-scene',
  templateUrl: './room-scene.component.html',
  styleUrls: ['./room-scene.component.scss']
})
export class RoomSceneComponent implements OnInit {

  constructor(public service: RoomService) { }

  sub = new SubHelper();
  sceneType:any;

  ngOnInit(): void {
    this.sub.sub = this.service.sceneType.subscribe(x=> {
      this.sceneType = x;
    })
  }


}
