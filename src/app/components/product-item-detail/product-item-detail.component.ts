import { Component, Input, OnInit } from '@angular/core';
import { ServerConnectionService } from '../../services/server-connection.service';
import { GenericResponse } from '../../models/generic-response';
import { AlertManagerService } from '../../services//alert-manager.service';
import { AuthorizationService } from '../../services/authorization.service';
import { StorehouseService } from '../../services/storehouse.service';
import { ProductItem } from '../../models/product-item';  
import { DatePipe } from '@angular/common'


@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})

export class ProductItemDetailComponent implements OnInit {

  @Input() item: ProductItem = new ProductItem();
  public amountToTake = this.item.productType.unit.iterator;
  
  constructor(private server: ServerConnectionService,
    private alertManager: AlertManagerService,
    public authorizationService: AuthorizationService,
    private storehouseService: StorehouseService,
    public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.amountToTake = this.item.productType.unit.iterator;
  } 

  public decreaseAmountToTake(count:number):void{

    if (this.amountToTake < 0 ) {
      this.amountToTake = 0;
      return;
    }

    if(count == 1){
      this.amountToTake = Number((this.amountToTake - this.item.productType.unit.iterator).toFixed(1));
    }
    else{
      this.amountToTake = Number((this.amountToTake - this.item.productType.unit.iterator 
                                                    - this.item.productType.unit.iterator).toFixed(1));
    }

    if (this.amountToTake < 0) {
      this.amountToTake = 0;
      return;
    }

  }

  public onSubmit(): void {
    var newAmount = this.item.amount - this.amountToTake;
    if (newAmount > 0) {
      this.server.putQuery<GenericResponse<boolean>>('/productitem/updateamount/' + this.item.id,newAmount).subscribe(data => {
        if (data.isSuccess) {
          this.alertManager.showSuccess("TODO");
          this.storehouseService.triggerOnChangeSelectedStorehouse();
        }
        else {
          this.alertManager.showError(data.error.errorMessage);
        }
      });
    }
    else{
      if(newAmount == 0){
        this.delete();
      }
    }

  }

  public increaseAmoutToTake(count:number):void{

    if (this.item.amount < this.amountToTake) {
      this.amountToTake = this.item.amount;
      return;
    }

    if(count == 1){
      this.amountToTake = Number((this.amountToTake + this.item.productType.unit.iterator).toFixed(1));
    }
    else{
      this.amountToTake = Number((this.amountToTake + this.item.productType.unit.iterator 
                                                    + this.item.productType.unit.iterator).toFixed(1));
    }

    if (this.item.amount < this.amountToTake) {
      this.amountToTake = this.item.amount;
      return;
    }
  
 }

 public getExpireDate(){
   var expireDate = new Date();
   var manufDateAsString = this.datepipe.transform((this.item.manufactureDate), 'MM-dd-yyyy');
   var date = new Date(manufDateAsString) ;
   expireDate.setDate(date.getDate() + this.item.productType.expirationTerm)
   var expireDateAsString = this.datepipe.transform((expireDate), 'dd-MM-yyyy');
  return expireDateAsString;
 }

  public delete():void{
    this.server.deleteQuery<GenericResponse<boolean>>('/productitem/' + this.item.id).subscribe(data => {
      if (data.isSuccess) {
        this.alertManager.showSuccess("Product Item was successfully deleted");
        this.storehouseService.triggerOnChangeSelectedStorehouse();
      }
      else {
        this.alertManager.showError(data.error.errorMessage);
      }
    });
  }

  public getCountLeftProductItem(){
    if(this.item.productType.expirationTerm == 0){
      return "No expiring"
    }

    return this.item.productType.expirationTerm - this.getCountOfPassedDays(this.item.manufactureDate);
  }

  private getCountOfPassedDays(date:string):number{
    let today = new Date();
    let todayDate = this.datepipe.transform((today), 'MM-dd-yyyy') ;
    var diff = Math.abs(new Date(todayDate).getTime() - (new Date(date)).getTime());
    return Math.ceil(diff / (1000 * 3600 * 24) ) + 1 ; 
  }

  public getLeftProductItemForDisplay():number{

     var diffDays = this.getCountOfPassedDays(this.item.manufactureDate);

     if(this.item.productType.expirationTerm - diffDays <=0){
       return 100;
     }

     var result = (100 / this.item.productType.expirationTerm) * diffDays
     return result
  }
}
