import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { RoomComponent } from './room/room.component';
import { HeroComponent } from './hero/hero.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'room/:id', component: RoomComponent },
  { path: 'room/:id/:guid', component: RoomComponent },
  { path: 'hero/:id', component: HeroComponent },
  { path: 'admin', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RouterRoutingModule { }
