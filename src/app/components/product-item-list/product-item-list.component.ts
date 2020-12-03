import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ServerConnectionService } from '../../services/server-connection.service';
import { GenericResponse } from '../../models/generic-response';
import { AlertManagerService } from '../../services//alert-manager.service';
import { AuthorizationService } from '../../services/authorization.service';
import { StorehouseService } from '../../services/storehouse.service';
import { ProductItem } from '../../models/product-item';
import { ActivatedRoute } from '@angular/router';
import { ProductTypeService } from 'src/app/services/productType.service';

@Component({
  selector: 'app-product-item-list',
  templateUrl: './product-item-list.component.html',
  styleUrls: ['./product-item-list.component.css']
})
export class ProductItemListComponent implements OnInit {

  public productItems: ProductItem[];
  public displayedColumns: string[] = ['photo','note', 'amount','additionalInfo'];

  constructor(private server: ServerConnectionService,
    private alertManager: AlertManagerService,
    public authorizationService: AuthorizationService,
    private storehouseService: StorehouseService,
    private productTypeService:ProductTypeService) {
  }

  ngOnInit(): void {
    //this.storehouseService.storehouseIndex = this.storehouseService.storehouses.indexOf(this.storehouseService.selectedStorehouse);
    this.productTypeService.deleteProductTypeForCreateProductItem();
    this.storehouseService.deleteStorehouseForCreateProductItem();
    this.getProductItems();
    this.storehouseService.trigger$.subscribe(() => this.getProductItems());
  }

  public async getProductItems(): Promise<void> {
    debugger;
    if (this.storehouseService.isEmpty){
      await this.storehouseService.getStorehousesAsync()
    }

    
    if(this.storehouseService.selectedStorehouse != null){
      localStorage.setItem("colorOfHeader", '#' + this.storehouseService.selectedStorehouse.colorHex.slice(2));
    }

    this.server.getQuery<GenericResponse<boolean>>('/storehouse/' + this.storehouseService.selectedStorehouse.id + '/getproductitems').subscribe(data => {
      if (data.isSuccess) {
        this.productItems = data.data;
      }
      else {
        this.alertManager.showError(data.error.errorMessage);
      }
    });
  }
}

