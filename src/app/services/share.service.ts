import { Injectable } from '@angular/core';
import { ProductItem } from '../models/product-item'

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  get productItemFromForm(): ProductItem {
    return this.getProductItemInfoFromForm();
  }


  public getProductItemInfoFromForm(): ProductItem {
    let productItem = localStorage.getItem("ProductItemInfoFromForm");
    return JSON.parse(productItem);
  }

  public saveProductItemInfoFromForm(productItem: ProductItem) {
    localStorage.setItem("ProductItemInfoFromForm", JSON.stringify(productItem))
  }
}