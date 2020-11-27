import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShareService } from '../../services/share.service';
import { ProductItem } from 'src/app/models/product-item';
import { ProductTypeService } from 'src/app/services/productType.service';
import { StorehouseService } from 'src/app/services/storehouse.service';
import { numberOnlyValidation } from '../../shared/validation';
import { ActivatedRoute } from '@angular/router';
import { ServerConnectionService } from 'src/app/services/server-connection.service';
import { AlertManagerService } from 'src/app/services/alert-manager.service';
import { GenericResponse } from '../../models/generic-response';


@Component({
  selector: 'app-product-item-edit',
  templateUrl: './product-item-edit.component.html',
  styleUrls: ['./product-item-edit.component.css']
})
export class ProductItemEditComponent implements OnInit {

  public ProductItemForm: FormGroup;
  public id:number = 0;
  public productItem = new ProductItem;

  constructor(private fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    public productTypeService: ProductTypeService,
    public storehouseService: StorehouseService,
    private router: Router,
    private shareService: ShareService,
    private server: ServerConnectionService,
    private alertManager: AlertManagerService) { }

  ngOnInit(): void 
  {
    this.formEmptyInitialization();
    this.id = this.activateRoute.snapshot.params['id'];
    if (this.id == 0) {
      if ((this.productTypeService.productTypeInfoForCreateProductItem != null) || (this.storehouseService.storehouseInfoForCreateProductItem != null)) {
        this.formReconstruction();
      }
    }
    else{
      this.server.getQuery<GenericResponse<boolean>>('/storehouse/' + this.storehouseService.selectedStorehouse.id
       + '/getproductitem/' + this.id).subscribe(data => {
        if (data.isSuccess) {
          this.productItem = data.data;
          this.formInitialization();
        }
      });
    }
  }

  private formEmptyInitialization() {
    this.ProductItemForm = this.fb.group({
      isOpened: ['', Validators.required],
      manufactureDate: [''],
      purchaseDate: [''],
      notes: ['', Validators.required],
      amount: ['', [numberOnlyValidation]],
    });
  }

  private formInitialization() {
    this.ProductItemForm = this.fb.group({
      isOpened: [this.productItem.isOpened, Validators.required],
      manufactureDate: [this.productItem.manufactureDate],
      purchaseDate: [this.productItem.purchaseDate],
      notes: [this.productItem.notes, Validators.required],
      amount: [this.productItem.amount, [numberOnlyValidation]],
    });
  }

  formReconstruction() {
    this.ProductItemForm = this.fb.group({
      isOpened: [this.shareService.productItemFromForm.isOpened, Validators.required],
      manufactureDate: [this.shareService.productItemFromForm.manufactureDate],
      purchaseDate: [this.shareService.productItemFromForm.purchaseDate],
      notes: [this.shareService.productItemFromForm.notes, Validators.required],
      amount: [this.shareService.productItemFromForm.amount, [numberOnlyValidation]],
    });
  }

  ngOnDestroy(): void {
    this.saveFormInfo();
  }

  saveFormInfo() {
    let productItem: ProductItem = new ProductItem();
    productItem.manufactureDate = this.ProductItemForm.value.manufactureDate;
    productItem.purchaseDate = this.ProductItemForm.value.purchaseDate;
    productItem.isOpened = this.ProductItemForm.value.isOpened;
    productItem.notes = this.ProductItemForm.value.notes;
    productItem.amount = this.ProductItemForm.value.amount;
    this.shareService.saveProductItemInfoFromForm(productItem);
  }

  selectProductType() {
    this.productTypeService.isForCreateProductItem = true;
    this.router.navigate(['product-type-list'])
  }

  selectStorehouse() {
    this.storehouseService.isForCreateProductItem = true;
    this.router.navigate(['storehouse-list'])
  }

  onSubmit() {
    if(this.id == 0){
      this.productItem.productTypeId = this.productTypeService.productTypeInfoForCreateProductItem.id;
      this.productItem.newStorehouseId = this.storehouseService.storehouseInfoForCreateProductItem.id;
    }
    else{
      if(this.storehouseService.storehouseInfoForCreateProductItem != null){
        this.productItem.newStorehouseId = this.storehouseService.storehouseInfoForCreateProductItem.id;
      }
      else{
        this.productItem.newStorehouseId = this.storehouseService.selectedStorehouse.id;
      }
    }

    this.productItem.isOpened = this.ProductItemForm.value.isOpened;
    this.productItem.manufactureDate = this.ProductItemForm.value.manufactureDate;
    this.productItem.notes = this.ProductItemForm.value.notes;
    this.productItem.purchaseDate = this.ProductItemForm.value.purchaseDate;
    this.productItem.amount = this.ProductItemForm.value.amount;

    if (this.ProductItemForm.valid) {
      if (this.id != 0) {
        this.update();
      } else {
       this.create();
      }
    }
  }

  private update() {
    this.server.putQuery<GenericResponse<boolean>>('/productitem/' +  this.id,
      this.productItem).subscribe(data => {
        if (data.isSuccess) {
          this.router.navigate(['product-item-list']);
          this.alertManager.showSuccess("Product Item was updated successfully");
        }
        else {
          this.alertManager.showError(data.error.errorMessage);
        }
    })
  }

  private create() {
    this.server.postQuery<GenericResponse<boolean>>('/storehouse/' +  this.productItem.newStorehouseId + '/postproductitems',
      this.productItem).subscribe(data => {
      if (data.isSuccess) {
        this.router.navigate(['product-item-list']);
        this.alertManager.showSuccess("Product Item was created successfully");
      }
      else {
        this.alertManager.showError(data.error.errorMessage);
      }
    })
  }
}
