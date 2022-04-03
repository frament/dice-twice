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
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { RouterRoutingModule } from './router-routing.module';
import { MainComponent } from './main/main.component';
import { CdkTreeModule } from '@angular/cdk/tree';
import { AddRoomDialogComponent } from './main/add-room-dialog/add-room-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { JWTInterceptor } from './jwt.interceptor';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { InviteDialogComponent } from './room/invite-dialog/invite-dialog.component';
import { HeroComponent } from './hero/hero.component';
import { HeroCardComponent } from './hero/hero-card/hero-card.component';
import { RoomUserCardComponent } from './room/room-user-card/room-user-card.component';
import { DeleteRoomDialogComponent } from './room/delete-room-dialog/delete-room-dialog.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RoomSceneComponent } from './room/room-scene/room-scene.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { RoomImageListComponent } from './room/room-image-list/room-image-list.component';
import { RoomHeroComponent } from './room/room-hero/room-hero.component';
import { AdminComponent } from './admin/admin.component';
import { DiceRollerComponent } from './room/dice-roller/dice-roller.component';
import { MasterMaterialsComponent } from './room/master-materials/master-materials.component';
import { GlobalMaterialsComponent } from './room/global-materials/global-materials.component';
import { GlobalMaterialSelectorComponent } from './room/global-materials/global-material-selector/global-material-selector.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatRippleModule } from '@angular/material/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { AddHeroDialogComponent } from './main/add-hero-dialog/add-hero-dialog.component';
import { RightTopActionsComponent } from './right-top-actions/right-top-actions.component';
import { HeroScoreWModComponent } from './hero/mini-components/hero-score-wmod/hero-score-wmod.component';
import { HeroSkillStatComponent } from './hero/mini-components/hero-skill-stat/hero-skill-stat.component';
import { HeroSavesComponent } from './hero/hero-left/hero-saves/hero-saves.component';
import { HeroScoresComponent } from './hero/hero-left/hero-scores/hero-scores.component';
import { HeroSkillsComponent } from './hero/hero-left/hero-skills/hero-skills.component';
import { SimpleNamedStatComponent } from './hero/mini-components/simple-named-stat/simple-named-stat.component';
import { HeroOtherLangComponent } from './hero/hero-left/hero-other-lang/hero-other-lang.component';
import { HeroMiscComponent } from './hero/hero-center/hero-misc/hero-misc.component';
import { HeroFlavorComponent } from './hero/hero-center/hero-flavor/hero-flavor.component';
import { HeroMoneyCounterComponent } from './hero/mini-components/hero-money-counter/hero-money-counter.component';
import { HeroEquipmentComponent } from './hero/hero-center/hero-equipment/hero-equipment.component';
import { HeroPagesComponent } from './hero/hero-center/hero-pages/hero-pages.component';
import { HeroCombatMainComponent } from './hero/hero-right/hero-combat-main/hero-combat-main.component';
import { SimpleNamedStatTopComponent } from './hero/mini-components/simple-named-stat-top/simple-named-stat-top.component';
import { HeroCombatHealthComponent } from './hero/hero-right/hero-combat-health/hero-combat-health.component';
import { HeroCombatHealthDiceComponent } from './hero/hero-right/hero-combat-health-dice/hero-combat-health-dice.component';
import { HeroCombatDeathComponent } from './hero/hero-right/hero-combat-death/hero-combat-death.component';
import { HeroAttacksComponent } from './hero/hero-right/hero-attacks/hero-attacks.component';
import { HeroAttacksOtherComponent } from './hero/hero-right/hero-attacks-other/hero-attacks-other.component';
import { HeroCombatHealthTempComponent } from './hero/hero-right/hero-combat-health-temp/hero-combat-health-temp.component';
import { RoomLeftTopActionsComponent } from './room/room-left-top-actions/room-left-top-actions.component';
import { RoomButtonsComponent } from './room/room-buttons/room-buttons.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RoomAudioComponent } from './room/room-audio/room-audio.component';

@NgModule({
  declarations: [AppComponent, AuthFormComponent, RoomComponent, MainComponent, AddRoomDialogComponent, InviteDialogComponent,
    HeroComponent, HeroCardComponent, RoomUserCardComponent, DeleteRoomDialogComponent, RoomSceneComponent, RoomImageListComponent,
    RoomHeroComponent, AdminComponent, DiceRollerComponent, MasterMaterialsComponent, GlobalMaterialsComponent,
    GlobalMaterialSelectorComponent, AddHeroDialogComponent, RightTopActionsComponent, HeroScoreWModComponent,
    HeroSkillStatComponent, HeroSavesComponent, HeroScoresComponent, HeroSkillsComponent, SimpleNamedStatComponent,
    HeroOtherLangComponent, HeroMiscComponent, HeroFlavorComponent, HeroMoneyCounterComponent, HeroEquipmentComponent,
    HeroPagesComponent, HeroCombatMainComponent, SimpleNamedStatTopComponent, HeroCombatHealthComponent,
    HeroCombatHealthDiceComponent, HeroCombatDeathComponent, HeroAttacksComponent, HeroAttacksOtherComponent,
    HeroCombatHealthTempComponent,
    RoomLeftTopActionsComponent,
    RoomButtonsComponent,
    RoomAudioComponent
  ],
  imports: [BrowserModule, HttpClientModule, MatCardModule, MatFormFieldModule, MatInputModule, FormsModule,
    BrowserAnimationsModule, ReactiveFormsModule, MatButtonModule, MatIconModule, RouterModule, RouterRoutingModule, CdkTreeModule,
    MatDialogModule, MatToolbarModule, MatMenuModule, MatSidenavModule, MatProgressBarModule, MatChipsModule, MatExpansionModule, MatListModule, ClipboardModule,
    MatSnackBarModule, NgxFileDropModule, PdfViewerModule, MatRippleModule, OverlayModule, DragDropModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JWTInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  exports: [
    RoomComponent
  ],
})
export class AppModule {}
