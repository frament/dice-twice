import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../services/rooms.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dice-twice-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public service: RoomsService,
              private router: Router) { }
  async ngOnInit(): Promise<void> {

  }

  async deleteRoom(id:number):Promise<void>{
    await this.service.deleteRoom(id);
  }

  async goToRoom(id:number):Promise<void>{
    await this.router.navigateByUrl('room/'+id);
  }

}
