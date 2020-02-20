import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, shareReplay, tap, map } from 'rxjs/operators';
import {Product} from './product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // tslint:disable
  private baseUrl = 'https://storerestservice.azurewebsites.net/api/products/';

  constructor(private http: HttpClient) {
    this.initProducts();
  }

  products$: Observable<Product[]>;

  initProducts() {
    this.products$ =
      this
        .http
        .get<Product[]>(this.baseUrl)
        .pipe(
          delay(2000),
          // tap(data => console.log(data)) // short syntax of this would be tap(console.log)
          tap(console.table),
          shareReplay()
        );
  }

  insertProduct(newProduct: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, newProduct);
  }

}
