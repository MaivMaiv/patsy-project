import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DateService {
  private apiUrl = 'http://worldtimeapi.org/api/ip';
  constructor(private http: HttpClient) {}
  getCurrentDateTime(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  formatDate(dateString: string): string {
    const dateObj = new Date(dateString);
    return dateObj.toISOString().split('T')[0];
  }

  formatTime(dateTimeString: string): string {
    const dateTime = new Date(dateTimeString);
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${ampm}`;
  }
}
