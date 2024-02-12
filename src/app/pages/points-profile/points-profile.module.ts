import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PointsProfilePageRoutingModule } from './points-profile-routing.module';
import { PointsProfilePage } from './points-profile.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PointsProfilePageRoutingModule,
  ],
  declarations: [PointsProfilePage],
})
export class PointsProfilePageModule {}
