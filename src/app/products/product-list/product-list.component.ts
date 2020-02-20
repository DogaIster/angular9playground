import { Component, OnInit } from '@angular/core';
import {Product} from '../product.interface';
import {ProductService} from '../product.service';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  // tslint:disable
  title: string = 'Products';
 // products: Product[];
  products$: Observable<Product[]>;
  selectedProduct: Product;
  productsNb = 0;

  // Pagination
  pageSize = 10;
  start = 0;
  end = this.pageSize;
  currentPage = 1;

  previousPage() {
    this.start -= this.pageSize;
    this.end -= this.pageSize;
    this.currentPage --;
    this.selectedProduct = null;
  }

  nextPage() {
    this.start += this.pageSize;
    this.end += this.pageSize;
    this.currentPage++;
    this.selectedProduct = null;
  }

  onSelect(product: Product) {
    this.selectedProduct = product;
  }

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products$ = this.productService.products$.pipe(
      tap(products => this.productsNb = products.length)
    );
    // this.productService.products$.subscribe(
    //   data => this.products = data,
    //   error => console.log('error')
    // );
    // Gotta unsubscribe to prevent memory leaks, "| async takes care of it if used
    // ngOnDestroy(){
    //   if(this.subscription){
    //     this.subscription.unsubscribe();
    //   }
    // }
  }

}
