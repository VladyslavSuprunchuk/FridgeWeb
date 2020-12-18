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
  public amountToTake:number;

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

  public delete(id:number):void{
    this.server.deleteQuery<GenericResponse<boolean>>('/productitem/' + id).subscribe(data => {
      if (data.isSuccess) {
        this.alertManager.showSuccess("Product Item was successfully deleted");
        this.getProductItems();
      }
      else {
        this.alertManager.showError(data.error.errorMessage);
      }
    });
  }

  public getCountLeftProductItem(item:ProductItem):number{
    return item.productType.expirationTerm - this.getCountOfPassedDays(item.manufactureDate);
  }

  private getCountOfPassedDays(date:string):number{
    let today = new Date();
    let todayDate = this.datepipe.transform((today), 'MM-dd-yyyy') ;
    var diff = Math.abs(new Date(todayDate).getTime() - (new Date(date)).getTime());
    return Math.ceil(diff / (1000 * 3600 * 24) ) + 1 ; 
  }

  public getLeftProductItemForDisplay(item:ProductItem):number{

     var diffDays = this.getCountOfPassedDays(item.manufactureDate);

     if(item.productType.expirationTerm - diffDays <=0){
       return 100;
     }

     var result = (100 / item.productType.expirationTerm) * diffDays
     return result
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
      }
      else {
        this.alertManager.showError(data.error.errorMessage);
      }
    });
  }
}

