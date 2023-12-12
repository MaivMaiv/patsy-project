import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ScreenOrientationService } from './services/screen-orientation.service';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ProductSettingsComponent } from './components/product-settings/product-settings.component';
import { EditCartAmountComponent } from './components/edit-cart-amount/edit-cart-amount.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [AppComponent,ProductSettingsComponent, EditCartAmountComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule ],
  providers: [ScreenOrientationService, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy,  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
