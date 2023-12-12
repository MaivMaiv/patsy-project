import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InventoryPageRoutingModule } from './inventory-routing.module';
import { InventoryPage } from './inventory.page';
import { AddInventoryComponent } from '../components/add-inventory/add-inventory.component';
import { EditInventoryComponent } from '../components/edit-inventory/edit-inventory.component';
@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, InventoryPageRoutingModule, FormsModule],
  declarations: [InventoryPage, AddInventoryComponent, EditInventoryComponent],
})
export class InventoryPageModule {}
