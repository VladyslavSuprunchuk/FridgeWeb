import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductTypeService } from 'src/app/services/productType.service';
import { StorehouseService } from 'src/app/services/storehouse.service';

@Component({
  selector: 'app-product-item-edit',
  templateUrl: './product-item-edit.component.html',
  styleUrls: ['./product-item-edit.component.css']
})
export class ProductItemEditComponent implements OnInit {

  ProductItemForm: FormGroup;

  constructor(private fb: FormBuilder,
    public productTypeService:ProductTypeService,
    public storehouseService:StorehouseService,
    private router: Router) { }

  ngOnInit(): void {
    this.formEmptyInitialization();
  }

  private formEmptyInitialization() {
    this.ProductItemForm = this.fb.group({
      productType: ['', Validators.required],
      storehouse: ['', Validators.required],
      manufactureDate: ['', Validators.required],
      purchaseDate: ['', Validators.required],
      notes: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  ngOnDestroy():void{
    if(this.productTypeService.isForCreateProductItem == false && this.storehouseService.isForCreateProductItem == false)
    {
      this.productTypeService.deleteProductTypeForCreateProductItem();
      this.storehouseService.deleteStorehouseForCreateProductItem();
    }
  }

  selectProductType(){
    this.productTypeService.isForCreateProductItem = true;
    this.router.navigate(['product-type-list'])
  }

  selectStorehouse(){
    this.storehouseService.isForCreateProductItem = true;
    this.router.navigate(['storehouse-list'])
  }

  onSubmit(){
    
  }
}
