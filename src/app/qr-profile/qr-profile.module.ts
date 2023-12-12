import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QRCodeModule } from 'angularx-qrcode';
import { QrProfilePageRoutingModule } from './qr-profile-routing.module';
import { QrProfilePage } from './qr-profile.page';
@NgModule({
  imports: [
    QRCodeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    QrProfilePageRoutingModule,
  ],
  declarations: [QrProfilePage],
})
export class QrProfilePageModule {}
