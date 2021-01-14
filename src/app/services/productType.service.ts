import { Injectable } from '@angular/core';
import { ProductType } from '../models/product-type'

@Injectable({
  providedIn: 'root'
}) // TypeInfoForCreate
export class ProductTypeService {

  private _selectedProductTypeForCreateProductItem: ProductType;

  constructor() { }

  public get selectedProductTypeForCreateProductItem(){ 
    return this._selectedProductTypeForCreateProductItem ?? this.getProductTypeForCreateProductItemFromSession();
  }

  public set selectedProductTypeForCreateProductItem(productType: ProductType){ 
   this._selectedProductTypeForCreateProductItem = productType;
   localStorage.setItem("ProductTypeInfoForCreateProductItem", JSON.stringify(this._selectedProductTypeForCreateProductItem));
  }

  private getProductTypeForCreateProductItemFromSession(): ProductType{
    let productType = localStorage.getItem("ProductTypeInfoForCreateProductItem");
    this._selectedProductTypeForCreateProductItem =  JSON.parse(productType)
    return this._selectedProductTypeForCreateProductItem;
  }
}