import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FileUploadComponent } from './master/file-upload/file-upload.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { JWTInterceptor } from './jwt.interceptor';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { InviteDialogComponent } from './room/invite-dialog/invite-dialog.component';
import { HeroComponent } from './hero/hero.component';
import { HeroCardComponent } from './hero/hero-card/hero-card.component';
import { RoomUserCardComponent } from './room/room-user-card/room-user-card.component';

@NgModule({
  declarations: [AppComponent, AuthFormComponent, RoomComponent, MasterComponent, MainComponent, AddRoomDialogComponent, FileUploadComponent, InviteDialogComponent, HeroComponent, HeroCardComponent, RoomUserCardComponent],
  imports: [BrowserModule, HttpClientModule, MatCardModule, MatFormFieldModule, MatInputModule, FormsModule,
    BrowserAnimationsModule, ReactiveFormsModule, MatButtonModule, MatIconModule, RouterModule, RouterRoutingModule, CdkTreeModule,
    MatDialogModule, MatToolbarModule, MatMenuModule, MatSidenavModule, MatProgressBarModule, MatChipsModule, MatExpansionModule, MatListModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JWTInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  exports: [
    RoomComponent,
    MasterComponent
  ],
})
export class AppModule {}
