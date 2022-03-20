import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../services/rooms.service';
import { Router } from '@angular/router';
import { HeroService } from '../services/hero.service';
import { Hero } from '../../../../api/src/app/services/heroes/hero';
import { AddRoomDialogComponent } from './add-room-dialog/add-room-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Room } from '../../../../api/src/app/services/rooms/room';
import { UserService } from '../services/user.service';
import { AddHeroDialogComponent } from './add-hero-dialog/add-hero-dialog.component';

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
  defaultSvgColor = '#1D1D1B';
  activeSvgColor = '#430d0a';
  myHeroes: Hero[] = [];
  myRooms:  Room[] = [];
  console = console;

  roomsAddColor = '#1D1D1B';
  roomsDropColor = '#1D1D1B';
  heroesAddColor = '#1D1D1B';
  heroesDropColor = '#1D1D1B';
  exitTitleColor = '#1D1D1B';
  isOpenRooms = false;
  isOpenHeroes = false;

  async ngOnInit(): Promise<void> {
    this.myHeroes = await this.heroes.getMyHeroes();
    this.myRooms = await this.rooms.getMyRooms();
  }

  async deleteRoom(id:number):Promise<void>{
    await this.rooms.deleteRoom(id);
    this.myRooms = await this.rooms.getMyRooms();
  }

  async goToRoom(id:number):Promise<void>{
    await this.router.navigateByUrl('room/'+id);
  }

  async goToHero(id:number):Promise<void>{
    await this.router.navigateByUrl('hero/'+id);
  }

  async deleteHero(id:number):Promise<void>{
    await this.heroes.deleteHero(id);
    this.myHeroes = await this.heroes.getMyHeroes();
  }

  async addRoom():Promise<void>{
    const dialogRef = this.dialog.open(AddRoomDialogComponent, {
      hasBackdrop: false,
    });
    dialogRef.afterClosed().subscribe(async result => {
      await this.rooms.addRoom(result);
      this.myRooms = await this.rooms.getMyRooms();
    });
  }
  async addHero():Promise<void>{
    const dialogRef = this.dialog.open(AddHeroDialogComponent, {
      hasBackdrop: false,
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result){
        await this.heroes.addHero({ Name:result, IdUser:this.user.currentUser?.userId });
        this.myHeroes = await this.heroes.getMyHeroes();
      }
    });
  }

}
