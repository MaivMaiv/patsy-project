import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.scss'],
})
export class AddInventoryComponent  implements OnInit {
  @Input() product: any = {
    productName: '',
    productCost: '',
    productType: '',
    productImage: [],
  };
  isUploaded: boolean = false;
  bestSellerArray: any [] = [];
  constructor(private modalController: ModalController, private reportService: ReportService) { }

  ngOnInit() {
  }

  addButton() {
    this.product = {
      productName: '',
      productCost: '',
      productType: '',
      productImage: [],
    };
  }

  clearButton() {
    this.product.productName = '';
    this.product.productCost = '';
    this.product.productType = '';
    this.product.productImage.length = 0;
    const imageInput = document.getElementById(
      'imageInput'
    ) as HTMLInputElement;
    if (imageInput) {
      imageInput.value = '';
    }
  }

  isButtonDisabled() {
    return (
      !this.product.productName ||
      !this.product.productCost ||
      !this.product.productType ||
      !this.product.productImage
    );
  }
  handleImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        this.product.productImage.push(dataUrl);
        this.isUploaded = true;
      };
      reader.readAsDataURL(file);
    }
  }

  add() {
    this.reportService.createBestReport(this.product.productName);
    this.modalController.dismiss({ modifiedProduct: this.product });
  }

  cancel() {
    this.modalController.dismiss();
  }
}
