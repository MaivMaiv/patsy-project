import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  private apiUrl = 'http://worldtimeapi.org/api/ip';

  constructor(private http: HttpClient) { }

  getCurrentDate(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
