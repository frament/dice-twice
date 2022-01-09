import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../services/rooms.service';

@Component({
  selector: 'dice-twice-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public service: RoomsService) { }
  async ngOnInit(): Promise<void> {

  }

  async deleteRoom(id:number, event:Event):Promise<void>{
    await this.service.deleteRoom(id);
    event.stopPropagation();
  }

}
