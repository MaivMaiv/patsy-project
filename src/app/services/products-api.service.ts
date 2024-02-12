import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsApiService {
  private products = 'https://api.escuelajs.co/api/v1/products/';
  private categories = 'https://api.escuelajs.co/api/v1/categories';
  private users = 'https://api.escuelajs.co/api/v1/users';
  constructor(private http: HttpClient) {}

  getProducts(productId: any): Observable<any> {
    return this.http.get(`${this.products}${productId}`);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.categories}`);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.users}`);
  }
}
