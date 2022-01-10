import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomsService } from '../services/rooms.service';
import { FullRoomInfo, roomStates } from '../../../../api/src/app/services/rooms/full-room-info';
import { UserService } from '../services/user.service';

@Component({
  selector: 'dice-twice-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  constructor(private route:ActivatedRoute,
              private room:RoomsService,
              public user:UserService) { }

  currentID:string = '';
  roomInfo:FullRoomInfo|undefined;
  masterMode:boolean = false;

  ngOnInit(): void {
    this.route.params.subscribe(async (params:any) => {
      if (params?.id && params.id !== this.currentID) {
        this.currentID = params.id;
        await this.updateRoom();
      }
    });
  }

  async setRoomState(state:roomStates):Promise<void>{
    if (this.currentID){
      await this.room.setSate(parseInt(this.currentID,10), state);
      await this.updateRoom();
    }
  }

  async updateRoom(): Promise<void>{
    if (this.currentID){
      this.roomInfo = await this.room.getRoomInfo(this.currentID);
      if (this.roomInfo && this.user.currentUser){
        this.masterMode = this.roomInfo?.Master === this.user.currentUser?.userId
      } else {
        this.masterMode = false;
      }
    }
  }

}
