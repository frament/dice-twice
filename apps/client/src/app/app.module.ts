import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoomComponent } from './room/room.component';
import { MasterComponent } from './master/master.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { RouterRoutingModule } from './router-routing.module';
import { MainComponent } from './main/main.component';
import { CdkTreeModule } from '@angular/cdk/tree';
import { AddRoomDialogComponent } from './master/add-room-dialog/add-room-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [AppComponent, AuthFormComponent, RoomComponent, MasterComponent, MainComponent, AddRoomDialogComponent],
  imports: [BrowserModule, HttpClientModule, MatCardModule, MatFormFieldModule, MatInputModule, FormsModule,
    BrowserAnimationsModule, ReactiveFormsModule, MatButtonModule, MatIconModule, RouterModule, RouterRoutingModule, CdkTreeModule,
    MatDialogModule],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    RoomComponent,
    MasterComponent
  ],
})
export class AppModule {}
