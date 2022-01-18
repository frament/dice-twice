import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { RoomComponent } from './room/room.component';
import { MasterComponent } from './master/master.component';
import { HeroComponent } from './hero/hero.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'room/:id', component: RoomComponent },
  { path: 'room/:id/:guid', component: RoomComponent },
  { path: 'master', component: MasterComponent },
  { path: 'hero/:id', component: HeroComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RouterRoutingModule { }
