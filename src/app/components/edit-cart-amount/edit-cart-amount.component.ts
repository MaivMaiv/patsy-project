import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-cart-amount',
  templateUrl: './edit-cart-amount.component.html',
  styleUrls: ['./edit-cart-amount.component.scss'],
})
export class EditCartAmountComponent  implements OnInit {
  @Input()
  modalAmount!: any;
  selectedOption: number = 1;
  amount: number = 1;
  constructor(private modalController: ModalController) { }

  ngOnInit() {}
  selectOption(option: number): void {
    this.selectedOption = option;
  }

  add() {
    this.modalAmount++;
  }

  sub() {
    if(this.modalAmount > 1 ){
      this.modalAmount--;
    }
  }


  edit() {
      const data = {
        amount: this.modalAmount,
      }

      this.modalController.dismiss(data);
  }
}
