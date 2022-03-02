import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../services/rooms.service';
import { Router } from '@angular/router';
import { HeroService } from '../services/hero.service';
import { Hero } from '../../../../api/src/app/services/heroes/hero';
import { AddRoomDialogComponent } from './add-room-dialog/add-room-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'dice-twice-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public service: RoomsService,
              private router: Router,
              private heroes: HeroService,
              public dialog: MatDialog,) { }

  myHeroes: Hero[] = [];
  async ngOnInit(): Promise<void> {
    this.myHeroes = await this.heroes.getMyHeroes();
  }

  async deleteRoom(id:number):Promise<void>{
    await this.service.deleteRoom(id);
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
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  async goTo(link:string){
    await this.router.navigateByUrl(link);
  }

}
