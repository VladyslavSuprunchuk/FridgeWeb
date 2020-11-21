import { Component, OnInit } from '@angular/core';
import { ServerConnectionService } from '../../services/server-connection.service';
import { Storehouse } from '../../models/storehouse';
import { GenericResponse } from '../../models/generic-response';
import { AlertManagerService } from '../../services//alert-manager.service';
import { AuthorizationService } from '../../services/authorization.service';
import { Router } from '@angular/router';
import { StorehouseService } from 'src/app/services/storehouse.service';

@Component({
  selector: 'app-storehouse-list',
  templateUrl: './storehouse-list.component.html',
  styleUrls: ['./storehouse-list.component.css']
})
export class StorehouseListComponent implements OnInit {

  public storehouses: Storehouse[];
  public displayedColumns: string[] = ['imageUrl', 'title', 'additionalInfo'];

  constructor(private server: ServerConnectionService,
    private alertManager: AlertManagerService,
    public authorizationService: AuthorizationService,
    private router: Router,
    public storehouseService:StorehouseService) { }

  ngOnInit(): void {
    this.server.getQuery<GenericResponse<boolean>>('/storehouse').subscribe(data => {
      if (data.isSuccess)
        this.storehouses = data.data;
      else {
        this.alertManager.showError(data.error.errorMessage);
      }
    });
  }

  public remove(id: number) {
    if (this.storehouses.find(x => x.id == id).isAuthor) {
      this.server.deleteQuery<GenericResponse<boolean>>('/storehouse/deletestorehouse/' + id).subscribe(data => {
        if (data.isSuccess) {
          this.alertManager.showSuccess("Storehouse has been deleted");
          this.ngOnInit()
        }
        else {
          this.alertManager.showError(data.error.errorMessage);
        }
      });
    }
    else {
      this.server.deleteQuery<GenericResponse<boolean>>('/storehouse/' + id + '/disconnect').subscribe(data => {
        if (data.isSuccess) {
          this.alertManager.showSuccess("You successfully disconnected");
          this.ngOnInit()
        }
        else {
          this.alertManager.showError(data.error.errorMessage);
        }
      });
    }
  }

  ngOnDestroy():void{
    this.storehouseService.isForCreateProductItem = false;
  }

  public setSelectedProductTypeForProductItem(storehouse:Storehouse){
    this.storehouseService.saveStorehouseInfoForCreateProductItem(storehouse);
    this.router.navigate(['product-item-edit/0']);
  }

  public urlForshareRedirect():string{
    return window.location.href.replace('storehouse-list','storehouse-join')
  }
}