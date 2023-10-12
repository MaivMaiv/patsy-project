import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DateService } from '../services/date.service';
import { Filesystem, FilesystemDirectory } from '@capacitor/filesystem';
import html2canvas from 'html2canvas';
import { Share } from '@capacitor/share';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
})
export class ReceiptPage implements OnInit {
  @ViewChild('cardContent', { read: ElementRef })
  cardContent!: ElementRef;
  currentDate: string = "";
  checkoutAmount: any;
  checkoutProducts: any[] = [];
  receiptDetails: any = {};
  finalAmount: any;
  imgFileName: any;
  imgFilePath: any;
  constructor(private dateService: DateService, private router: Router) { }

  ngOnInit() {
    this.dateService.getCurrentDate().subscribe(data => {
      const dateObj = new Date(data.utc_datetime);
      this.currentDate = dateObj.toISOString().split('T')[0];
    });
    const savedTotal = localStorage.getItem('checkoutTotal');
    if (savedTotal) {
      this.checkoutAmount = JSON.parse(savedTotal);
      console.log(this.checkoutAmount)
    }
    const savedProducts = localStorage.getItem('checkoutCart');
    if (savedProducts) {
      this.checkoutProducts = JSON.parse(savedProducts);
      console.log(this.checkoutProducts)
    }
    const savedDetails = localStorage.getItem('checkoutDetails');
    if (savedDetails) {
      this.receiptDetails = JSON.parse(savedDetails);
      console.log(this.checkoutProducts)
    }
    this.finalAmount = this.checkoutAmount - this.receiptDetails.checkoutDiscount;
}

async createDirectory() {
  try {
    await Filesystem.mkdir({
      path: 'receipts',
      directory: FilesystemDirectory.Documents,
      recursive: true
    });

    console.log('Directory created successfully');
  } catch (error) {
    console.error('Failed to create directory:', error);
  }
}

async captureCard() {
  this.createDirectory();
  const cardElement = this.cardContent.nativeElement;

  try {
    const canvas = await html2canvas(cardElement);
    const image = canvas.toDataURL('image/png');

    if (!image) {
      console.error('Failed to capture the card as an image.');
      return;
    }

    const fileName = 'captured-card.png';
    this.imgFileName = fileName;
    const filePath = `my-directory/${fileName}`;
    this.imgFilePath = filePath;

    const result = await Filesystem.writeFile({
      path: filePath,
      data: image,
      directory: FilesystemDirectory.Documents,
    });

    console.log('Image saved successfully:', result.uri);
  } catch (error) {
    console.error('Failed to save the image:', error);
  }
}

async shareImage() {
  try {
    const shareData = {
      title: 'Image Share',
      text: 'Check out this image!',
      files: [this.imgFilePath],
    };

    const result = await Share.share(shareData);
    console.log('Shared successfully:', result);
  } catch (error) {
    console.error('Sharing failed:', error);
  }
}

reset() {
  localStorage.removeItem("checkoutTotal");
  localStorage.removeItem("checkoutCart");
  localStorage.removeItem("checkoutDetails");
  this.router.navigate(["home"]);
}

}




