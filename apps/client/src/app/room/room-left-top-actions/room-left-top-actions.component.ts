import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../../services/rooms.service';

@Component({
  selector: 'dice-twice-room-left-top-actions',
  templateUrl: './room-left-top-actions.component.html',
  styleUrls: ['./room-left-top-actions.component.scss']
})
export class RoomLeftTopActionsComponent implements OnInit {

  constructor(private service: RoomsService) { }

  role:string = '';
  state: string = '';
  switchMode = {

  }
  ngOnInit(): void {
    this.service.currentRoomState.subscribe(x=>{
      if (!x) return;
      this.state = x.value;
    })
    this.service.currentRoomRole.subscribe(x=> {
      if (!x) return;
      this.role = x.value;
    })
  }
  async switchRoomState(){
    const id = this.service.currentRoomInfo.getValue()?.Id;
    const isMaster = this.service.currentRoomRole.getValue()?.key === 'master';
    if (id && isMaster){
      const state = this.service.stateSwitches[this.service.currentRoomState.getValue().key];
      await this.service.setSate(id, state);
    }
  }
}
