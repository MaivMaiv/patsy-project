import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-points',
  templateUrl: './points.page.html',
  styleUrls: ['./points.page.scss'],
})
export class PointsPage implements OnInit {
  constructor() { }

  ngOnInit() {
  }
  products = [
    { name: 'Product 1' },
    { name: 'Product 2' },
    { name: 'Product 3' },
    { name: 'Product 4' },
    { name: 'Product 5' },
  ];
  filteredProducts = this.products; // Initialize with all products

  filterProducts(searchTerm: any) {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
}
