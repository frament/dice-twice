import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../services/rooms.service';
import { Router } from '@angular/router';
import { HeroService } from '../services/hero.service';
import { Hero } from '../../../../api/src/app/services/heroes/hero';
import { AddRoomDialogComponent } from './add-room-dialog/add-room-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Room } from '../../../../api/src/app/services/rooms/room';
import { UserService } from '../services/user.service';

@Component({
  selector: 'dice-twice-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public rooms: RoomsService,
              private router: Router,
              private heroes: HeroService,
              public dialog: MatDialog,
              public user: UserService) { }

  myHeroes: Hero[] = [];
  myRooms:  Room[] = [];
  async ngOnInit(): Promise<void> {
    this.myHeroes = await this.heroes.getMyHeroes();
    this.myRooms = await this.rooms.getMyRooms();
  }

  async deleteRoom(id:number):Promise<void>{
    await this.rooms.deleteRoom(id);
  }

  async goToRoom(id:number):Promise<void>{
    await this.router.navigateByUrl('room/'+id);
  }

  async goToHero(id:number):Promise<void>{
    await this.router.navigateByUrl('hero/'+id);
  }

  async deleteHero(id:number):Promise<void>{
    await this.heroes.deleteHero(id);
  }

  async addRoom():Promise<void>{
    const dialogRef = this.dialog.open(AddRoomDialogComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(async result => {
      await this.rooms.addRoom(result);
      this.myRooms = await this.rooms.getMyRooms();
    });
  }
  async goTo(link:string){
    await this.router.navigateByUrl(link);
  }

}
