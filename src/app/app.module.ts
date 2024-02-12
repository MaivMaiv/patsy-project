import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ScreenOrientationService } from './services/screen-orientation.service';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AddInventoryComponent } from './components/add-inventory/add-inventory.component';
import { AddMemberComponent } from './components/add-member/add-member.component';
import { EditCartAmountComponent } from './components/edit-cart-amount/edit-cart-amount.component';
import { EditInventoryComponent } from './components/edit-inventory/edit-inventory.component';
import { ProductSettingsComponent } from './components/product-settings/product-settings.component';
import { ReportBestComponent } from './components/report-best/report-best.component';
import { ReportTrendsComponent } from './components/report-trends/report-trends.component';
import { ReportVisitsComponent } from './components/report-visits/report-visits.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EditAdminComponent } from './components/edit-admin/edit-admin.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [AppComponent, AddInventoryComponent, AddMemberComponent, AddEmployeeComponent, EditAdminComponent, EditCartAmountComponent, EditInventoryComponent, ProductSettingsComponent, ReportBestComponent, ReportTrendsComponent, ReportVisitsComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule, NgxDatatableModule],
  providers: [ScreenOrientationService, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy,  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
