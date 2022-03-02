import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { RoomsService } from './services/rooms.service';
import { CacheService } from './services/cache.service';

@Component({
  selector: 'dice-twice-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public userService: UserService,
              public roomsService: RoomsService,
              private router: Router,
              private cahce: CacheService) {}

  async ngOnInit(): Promise<void> {
    await this.cahce.init();
    await this.userService.init();
    await this.roomsService.loadMyRooms();
  }

  async goTo(link:string){
    await this.router.navigateByUrl(link);
  }

}
