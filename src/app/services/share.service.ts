import { Injectable } from '@angular/core';
import { ProductItem } from '../models/product-item'

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  public ProductItemInfoFromForm:ProductItem;

}