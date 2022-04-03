import { Component, OnInit } from '@angular/core';
import { RoomService } from '../room.service';
import { SubHelper } from '../../sub-helper';
import { RoomsService } from '../../services/rooms.service';

@Component({
  selector: 'dice-twice-room-scene',
  templateUrl: './room-scene.component.html',
  styleUrls: ['./room-scene.component.scss']
})
export class RoomSceneComponent implements OnInit {

  constructor(public service: RoomService, private rooms: RoomsService,) { }

  sub = new SubHelper();
  sceneType:any;

  ngOnInit(): void {
    this.sub.sub = this.service.sceneType.subscribe(x=> {
      this.sceneType = x;
    })
  }
  async clearImage(): Promise<void>{
    this.service.sceneType.next(undefined);
    this.service.mainShowData = undefined;
    await this.rooms.setMainShow(this.service.roomInfo?.Id ?? 0, undefined);
  }

}
