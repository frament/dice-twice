import { Component, OnInit } from '@angular/core';
import { Hero } from '../../../../../api/src/app/services/heroes/hero';
import { HeroService } from '../../services/hero.service';
import { RoomService } from '../room.service';
import { RoomsService } from '../../services/rooms.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'dice-twice-room-hero',
  templateUrl: './room-hero.component.html',
  styleUrls: ['./room-hero.component.scss']
})
export class RoomHeroComponent implements OnInit {

  constructor(private service: HeroService, private rooms: RoomsService, private user: UserService ) { }
  hero: Hero|undefined;
  heroList: Hero[]|undefined;
  async ngOnInit(): Promise<void> {
    this.rooms.currentRoomInfo.subscribe(async x=>{
      if (!x) return;
      const userId = this.user.currentUser?.userId;
      const roomUserdata = x.Players.find(p => p.playerId === userId);
      if (roomUserdata?.heroId){
        this.hero = await this.service.getHero(roomUserdata?.heroId);
      }else{
        this.heroList = await this.service.getMyHeroes();
      }
    })
  }
  async setRoomHero(h:Hero):Promise<void>{
    const roomId = this.rooms.currentRoomInfo.getValue()?.Id;
    if (roomId){
      await this.rooms.setRoomHero(roomId, h.Id);
      this.heroList = undefined;
      this.hero = await this.service.getHero(h.Id);
    }
  }

}
