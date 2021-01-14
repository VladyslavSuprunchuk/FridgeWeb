import { Component, OnInit } from '@angular/core';
import { ServerConnectionService } from '../../services/server-connection.service';
import { Storehouse } from '../../models/storehouse';
import { GenericResponse } from '../../models/generic-response';
import { AlertManagerService } from '../../services//alert-manager.service';
import { AuthorizationService } from '../../services/authorization.service';
import { Router,ActivatedRoute } from '@angular/router';
import { StorehouseService } from 'src/app/services/storehouse.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-storehouse-list',
  templateUrl: './storehouse-list.component.html',
  styleUrls: ['./storehouse-list.component.css']
})
export class StorehouseListComponent implements OnInit {

  public storehouses: Storehouse[];
  public displayedColumns: string[] = ['imageUrl', 'title', 'additionalInfo'];
  public isForCreateProductItem:boolean = false;

  constructor(private server: ServerConnectionService,
    private alertManager: AlertManagerService,
    public authorizationService: AuthorizationService,
    private router: Router,
    public storehouseService:StorehouseService,
    private activateRoute: ActivatedRoute,
    private _location: Location) { }

  ngOnInit(): void {

    this.isForCreateProductItem = this.activateRoute.snapshot.params['isForCreateProductItem'] == "true";

    this.server.getQuery<GenericResponse<boolean>>('/storehouse').subscribe(data => {
      if (data.isSuccess) {
        this.storehouses = data.data;
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

  public remove(id: number) {
    if (this.storehouses.find(x => x.id == id).isAuthor) {
      this.server.deleteQuery<GenericResponse<boolean>>('/storehouse/deletestorehouse/' + id).subscribe(data => {
        if (data.isSuccess) {

          if(this.storehouseService.selectedStorehouseInPanel.id == id){
            this.storehouseService.selectedStorehouseInPanel = null;
          }
  
          this.storehouseService.downloadStorehouses();
          this.alertManager.showSuccess("Storehouse has been deleted");
          this.ngOnInit()
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
    else {
      this.server.deleteQuery<GenericResponse<boolean>>('/storehouse/' + id + '/disconnect').subscribe(data => {
        if (data.isSuccess) {
          this.storehouseService.downloadStorehouses();
          this.alertManager.showSuccess("You successfully disconnected");
          this.ngOnInit()
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

  public setSelectedStorehouseForProductItem(storehouse:Storehouse){
    this.storehouseService.selectedStorehouseForCreateProductItem = storehouse;
    this._location.back();
  }

  public urlForshareRedirect():string{
    return window.location.href.replace('storehouse-list','storehouse-join')
  }
}