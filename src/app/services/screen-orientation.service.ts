import { Injectable } from '@angular/core';
import { ScreenOrientation } from '@capacitor/screen-orientation';
@Injectable({
  providedIn: 'root',
})
export class ScreenOrientationService {
  constructor() {}
  async lockLandscape() {
    try {
      await ScreenOrientation.lock({ orientation: 'landscape' });
    } catch (err) {
      console.error('Error locking screen orientation:', err);
    }
  }
  unlock() {
    ScreenOrientation.unlock();
  }
}
