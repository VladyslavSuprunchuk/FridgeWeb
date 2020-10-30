import { Injectable } from '@angular/core';
import { ProductType } from '../models/product-type'

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {

  constructor() { }

  saveProductTypeInfo(productType: ProductType) {
    localStorage.setItem("productTypeInfoForCopy",JSON.stringify(productType))
  }

}