import { Component, Input, OnInit } from '@angular/core';
import { ServerConnectionService } from '../../services/server-connection.service';
import { GenericResponse } from '../../models/generic-response';
import { AlertManagerService } from '../../services//alert-manager.service';
import { AuthorizationService } from '../../services/authorization.service';
import { StorehouseService } from '../../services/storehouse.service';
import { ProductItem } from '../../models/product-item';
import { DatePipe } from '@angular/common'
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})

export class ProductItemDetailComponent implements OnInit {

  @Input() item: ProductItem = new ProductItem();
  public amountToTake: number;
  public iterator: number;

  constructor(private server: ServerConnectionService,
    private alertManager: AlertManagerService,
    public authorizationService: AuthorizationService,
    private storehouseService: StorehouseService,
    public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.amountToTake = this.item.productType.unit.iterator;
    this.iterator = this.item.productType.unit.iterator;
  }

  public changrAmountToTake(iterator: number): void {
    this.amountToTake = Number((this.amountToTake + iterator).toFixed(1));

    if (this.amountToTake < 0) {
      this.amountToTake = 0;
    }

    if (this.item.amount < this.amountToTake) {
      this.amountToTake = this.item.amount;
    }
  }

  public onSubmit(): void {
    if (this.amountToTake.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) {
      var newAmount = this.item.amount - this.amountToTake;
      if (newAmount > 0) {
        this.server.putQuery<GenericResponse<boolean>>('/productitem/updateamount/' + this.item.id, newAmount).subscribe(data => {
          if (data.isSuccess) {
            this.alertManager.showSuccess("Amount has been changed");
            this.storehouseService.triggerOnChangeSelectedStorehouse();
          }
          else {
            this.alertManager.showError(data.error.errorMessage);
          }
        });
      }
      else {
        if (newAmount == 0) {
          this.delete();
        }
      }
    }
  }

  public getExpireDate() {
    var expireDate = new Date(this.item.manufactureDate);
    expireDate.setDate(expireDate.getDate() + this.item.productType.expirationTerm)
    return this.datepipe.transform((expireDate), 'dd-MM-yyyy');
  }

  public delete(): void {
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

  public getExpireDays() {
    if (this.item.productType.expirationTerm == 0) {
      return "No expiring"
    }

    //TODO uncomment when UnpackingDate is added
    // if (this.item.isOpened) {
    //   return this.item.productType.openedExpirationTerm - this.getCountOfPassedDays(this.item.manufactureDate);
    // }

    return this.item.productType.expirationTerm - this.getCountOfPassedDays(this.item.manufactureDate);
  }

  private getCountOfPassedDays(date: string): number {
    var diff = Math.abs(new Date().getTime() - new Date(date).getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
    return diffDays;
  }

  private getExpireDateForProgressBarPercentage(diffDays: number, date: number): number {
    if (date - diffDays <= 0) {
      return 100;
    }

    var result = (100 / date) * diffDays
    return result;
  }

  public getProgressBarPercentage(): number {
    var diffDays = this.getCountOfPassedDays(this.item.manufactureDate);
    //TODO uncomment when UnpackingDate is added
    // if (this.item.isOpened) {
    //   return this.getExpireDateForProgressBarPercentage(diffDays, this.item.productType.openedExpirationTerm);
    // }

    return this.getExpireDateForProgressBarPercentage(diffDays, this.item.productType.expirationTerm);
  }
}
