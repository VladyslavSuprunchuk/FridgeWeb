import { Component, OnInit } from '@angular/core';
import { ServerConnectionService } from '../../services/server-connection.service';
import { GenericResponse } from '../../models/generic-response';
import { AlertManagerService } from '../../services//alert-manager.service';
import { AuthorizationService } from '../../services/authorization.service';
import { StorehouseService } from '../../services/storehouse.service';
import { ProductItem } from '../../models/product-item';
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
    debugger;
    this.productTypeService.selectedProductTypeForCreateProductItem = null;
    this.storehouseService.selectedStorehouseForCreateProductItem = null;
    this.getProductItems();
    this.storehouseService.trigger$.subscribe(() => this.getProductItems());
  }
 

  public async getProductItems(): Promise<void> {
    if (this.storehouseService.isEmpty){
      await this.storehouseService.getStorehousesAsync()
    }

    if(this.storehouseService.selectedStorehouseInPanel != null){
      localStorage.setItem("colorOfHeader", '#' + this.storehouseService.selectedStorehouseInPanel.colorHex.slice(2));

      this.server.getQuery<GenericResponse<boolean>>('/storehouse/' + this.storehouseService.selectedStorehouseInPanel.id + '/getproductitems').subscribe(data => {
        if (data.isSuccess) {
          this.productItems = data.data;
        }
        else {
          if(data.error != null){
            this.alertManager.showError(data.error.errorMessage);
          }
          else{
            this.alertManager.showError("Internal Error");
          }
        }
      });
    }   
  }
}

