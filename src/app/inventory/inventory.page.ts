import { Component, OnInit, ViewChild } from '@angular/core'; 
import { Router } from '@angular/router';
import { AlertController, IonContent, IonModal, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {
  products: any[] = [];
  editAction: boolean = false;
  isUploaded: boolean = false;
  isUpdated: boolean = false;
  currentIndex: any;
  imageToBeUpdated: any;
  public product: any = {
    productName: "",
    productCost: "",
    productType: "",
    productImage: []
  }
  
  @ViewChild('mainElement', { static: true }) mainElement!: IonContent;
  @ViewChild(IonModal)
  modal!: IonModal;
  name: string = "";
  isEditMode: boolean = false;
  constructor(private modalController: ModalController, private alertController: AlertController, private router: Router) { }

  ngOnInit() {
    const savedProducts = localStorage.getItem('SavedProducts');
    if (savedProducts) {
      this.products = JSON.parse(savedProducts);
    }
  }

  colorToken() {
    if(this.product.productType == "brewed"){
      this.product.productCondition = 1;
    } else if (this.product.productType == "espresso"){
      this.product.productCondition = 2;
    }
    else if (this.product.productType == "dine-In"){
      this.product.productCondition = 3;
    }
    else if (this.product.productType == "non-Coffee"){
      this.product.productCondition = 4;
    }
    else if (this.product.productType == "mocktails"){
      this.product.productCondition = 5;    
    }
    else if (this.product.productType == "toasties"){
      this.product.productCondition = 6;
    }
    else if (this.product.productType == "specials"){
      this.product.productCondition = 7;
    }
  }

  addButton() {
    this.colorToken();
    this.products.push(this.product);
    this.product = {
      productName: "",
      productCost: "",
      productType: "",
      productImage: []
    };
    const imageInput = document.getElementById('imageInput') as HTMLInputElement;
      if (imageInput) {
        imageInput.value = '';
      }

    localStorage.setItem('SavedProducts', JSON.stringify(this.products));
  }

  async deleteButton(product: any){
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Are you sure you want to delete your product ' + product.productName,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('User clicked No');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('User clicked Yes');
            const index = this.products.findIndex((prod) => prod.productName === product.productName);
        if (index !== -1) {
          this.products.splice(index, 1);
          localStorage.setItem('SavedProducts', JSON.stringify(this.products));
          this.backButton();
        }
          }
        }
      ]
    });

    await alert.present();
        
  }
  

  clearButton() {
    this.product.productName = "";
    this.product.productCost = "";
    this.product.productType = "";
    this.product.productImage.length = 0;
    const imageInput = document.getElementById('imageInput') as HTMLInputElement;
    if (imageInput) {
      imageInput.value = '';
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  editButton(index: number) {
    console.log(index);
    this.editAction = true;
    this.currentIndex = index;
  }

  backButton() {
    this.editAction = false;
  }


  saveButton() {
    this.isUpdated = false;
    this.colorToken();
    this.products[this.currentIndex].productImage = this.product.productImage;
    this.product = {
      productName: "",
      productCost: "",
      productType: "",
      productImage: []
    };

    localStorage.setItem('SavedProducts', JSON.stringify(this.products));
    this.backButton();
  }
  

  menu(){
    this.router.navigate(['home'])
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
    this.isUploaded = true;
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        this.product.productImage.push(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  }

  handleImageUpdate(event: any) {
    this.product.productImage.length = 0;
    this.isUpdated = true;
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        this.imageToBeUpdated = dataUrl;
        this.product.productImage.push(this.imageToBeUpdated);
      };
      reader.readAsDataURL(file);
    }
  }

}
