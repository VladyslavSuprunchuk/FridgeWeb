import { Injectable } from '@angular/core';
import { ProductType } from '../models/product-type'

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {

  constructor() { }

  public get productTypeInfoForCreateProductItem(){
    return this.getProductTypeInfoForCreateProductItem();
  }

  public saveProductTypeInfoForCreateProductItem(productType: ProductType) {
    localStorage.setItem("ProductTypeInfoForCreateProductItem",JSON.stringify(productType))
  }

  public getProductTypeInfoForCreateProductItem():ProductType{
    let productType = localStorage.getItem("ProductTypeInfoForCreateProductItem");
    return JSON.parse(productType);
  }

  public deleteProductTypeForCreateProductItem(){
    localStorage.removeItem("ProductTypeInfoForCreateProductItem");
  }


}