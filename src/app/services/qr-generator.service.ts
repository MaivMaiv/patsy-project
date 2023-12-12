import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class QrGeneratorService {
  constructor() {}
  generateQRCode(data: string): string {
    return data;
  }
  getQrCodeElementType(): string {
    return 'url';
  }
}
