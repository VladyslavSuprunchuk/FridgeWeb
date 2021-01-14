import { Injectable } from '@angular/core';
import { GenericResponse } from '../models/generic-response';
import { Storehouse } from '../models/storehouse'
import { AlertManagerService } from './alert-manager.service';
import { ServerConnectionService } from './server-connection.service';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StorehouseService {

  private _storehouses: Storehouse[] = [];
  private _trigger = new Subject<void>();
  private _selectedStorehouseInPanel: Storehouse;
  private _selectedStorehouseForCreateProductItem: Storehouse;

  constructor(private server: ServerConnectionService, private alertManager: AlertManagerService) {
  }

  //#region Trigger Block
  // For updates Product Items list
  get trigger$() {
    return this._trigger.asObservable();
  }

  public triggerOnChangeSelectedStorehouse() {
    this._trigger.next();
  }
  //#endregion

  // -------------------------------------------------------------------------
  // Public Get and Set Properties
  // -------------------------------------------------------------------------

  public get selectedStorehouseInPanel(): Storehouse {
    return this._selectedStorehouseInPanel ?? this.getSelectedStorehouseInPanelFromSession();
  }

  public set selectedStorehouseInPanel(storehouse: Storehouse) {
    this._selectedStorehouseInPanel = storehouse;
    localStorage.setItem("SelectedStorehouseInPanel", JSON.stringify(storehouse));
  }

  public get selectedStorehouseForCreateProductItem() {
    return this._selectedStorehouseForCreateProductItem ?? this.getStorehouseForCreateProductItemFromSession();
  }

  public set selectedStorehouseForCreateProductItem(storehouse: Storehouse) {
     this._selectedStorehouseForCreateProductItem =  storehouse;
     localStorage.setItem("StorehouseInfoForCreateProductItem", JSON.stringify(storehouse));
  }

  get storehouses(): Storehouse[] {
    if (this._storehouses.length == 0) {
      this.downloadStorehouses();
    }

    return this._storehouses;
  }

  get isEmpty(): boolean {
    return this._storehouses.length == 0;
  }

  // -------------------------------------------------------------------------
  // Private Methods
  // -------------------------------------------------------------------------


  private getSelectedStorehouseInPanelFromSession() {
    let storehouse = localStorage.getItem("SelectedStorehouseInPanel");
    this._selectedStorehouseInPanel = JSON.parse(storehouse);
    return this._selectedStorehouseInPanel;
  }

  private getStorehouseForCreateProductItemFromSession(): Storehouse {
    let storehouse = localStorage.getItem("StorehouseInfoForCreateProductItem");
    this._selectedStorehouseForCreateProductItem = JSON.parse(storehouse);
    return this._selectedStorehouseForCreateProductItem;
  }
 

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------


  public resetListOfStorehouses() {
    this._storehouses.length = 0;
  }

  public downloadStorehouses(): void {
    this.server.getQuery<GenericResponse<boolean>>('/storehouse').subscribe(data => {
      if (data.isSuccess) {
        this._storehouses = data.data;
        if (this.selectedStorehouseInPanel == null) {
          if(this._storehouses.length != 0){
            this.selectedStorehouseInPanel = this._storehouses[0];
          }
        }
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

  public async getStorehousesAsync() {
    var data = await this.server.getQueryPromise<GenericResponse<boolean>>('/storehouse');

    if (data.isSuccess) {
      this._storehouses = data.data;
    }
    else {
      if(data.error != null){
        this.alertManager.showError(data.error.errorMessage);
      }
      else{
        this.alertManager.showError("Internal Error");
      }
    }

    if (this.selectedStorehouseInPanel == null) {
      if(this._storehouses.length != 0){
        this.selectedStorehouseInPanel = this._storehouses[0];
      }
    }
  }
}