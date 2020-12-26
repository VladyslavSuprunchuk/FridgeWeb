import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ServerConnectionService } from '../../services/server-connection.service';
import { GenericResponse } from '../../models/generic-response';
import { AlertManagerService } from '../../services//alert-manager.service';
import { AuthorizationService } from '../../services/authorization.service';
import { StorehouseService } from '../../services/storehouse.service';
import { ProductItem } from '../../models/product-item';
import { ActivatedRoute } from '@angular/router';
import { ProductTypeService } from 'src/app/services/productType.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-product-item-list',
  templateUrl: './product-item-list.component.html',
  styleUrls: ['./product-item-list.component.css']
})
export class ProductItemListComponent implements OnInit {

  public productItems: ProductItem[];

  constructor(private server: ServerConnectionService,
    private alertManager: AlertManagerService,
    public authorizationService: AuthorizationService,
    private storehouseService: StorehouseService,
    private productTypeService:ProductTypeService,
    public datepipe: DatePipe) {
  }

  ngOnInit(): void {
    this.productTypeService.deleteProductTypeForCreateProductItem();
    this.storehouseService.deleteStorehouseForCreateProductItem();
    this.getProductItems();
    this.storehouseService.trigger$.subscribe(() => this.getProductItems());
  }
 

  public async getProductItems(): Promise<void> {
    if (this.storehouseService.isEmpty){
      await this.storehouseService.getStorehousesAsync()
    }
    
    if(this.storehouseService.selectedStorehouse != null){
      localStorage.setItem("colorOfHeader", '#' + this.storehouseService.selectedStorehouse.colorHex.slice(2));
    }

    this.server.getQuery<GenericResponse<boolean>>('/storehouse/' + this.storehouseService.selectedStorehouse.id + '/getproductitems').subscribe(data => {
      if (data.isSuccess) {
        this.productItems = data.data;
        for(var i = 0; i < this.productItems.length;i++){
        }
      }
      else {
        this.alertManager.showError(data.error.errorMessage);
      }
    });
  }
}

