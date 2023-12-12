import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-product-settings',
  templateUrl: './product-settings.component.html',
  styleUrls: ['./product-settings.component.scss'],
})
export class ProductSettingsComponent  implements OnInit {
  @Input()
  modalTitle!: string;
  selectedOption: number = 1;
  amount: number = 1;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  selectOption(option: number): void {
    this.selectedOption = option;
  }

  add() {
    this.amount++;
  }

  sub() {
    if(this.amount > 0 ){
      this.amount--;
    }
  }

  close() {
    this.modalController.dismiss();
  }

  order() {
      const data = {
        amount: this.amount,
      }

      this.modalController.dismiss(data);
  }
}
