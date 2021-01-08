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

  constructor(private server: ServerConnectionService, private alertManager: AlertManagerService) {
  }

  get trigger$() {
    return this._trigger.asObservable();
  }

  public triggerOnChangeSelectedStorehouse() {
    this._trigger.next();
  }

  public get selectedStorehouse(): Storehouse {
    return this._selectedStorehouseInPanel ?? this.getSelectedStorehouseInPanelFromSession();
  }

  public set selectedStorehouse(storehouse: Storehouse) {
    this._selectedStorehouseInPanel = storehouse;
  }

  public get storehouseInfoForCreateProductItem() {
    return this.getStorehouseInfoForCreateProductItem();
  }

  get storehouses(): Storehouse[] {
    if (this._storehouses.length == 0) {
      this.downloadStorehouses();
    }

    return this._storehouses;
  }

  get isEmpty(): boolean {
    return this.storehouses.length == 0;
  }

  private getSelectedStorehouseInPanelFromSession() {
    let storehouse = localStorage.getItem("SelectedStorehouseInPanel");
    return JSON.parse(storehouse);
  }

  public getColorOfHeader(): string {
    return localStorage.getItem("colorOfHeader");
  }

  public dropColorOfHeader(): void {
    localStorage.removeItem("colorOfHeader");
  }

  public downloadStorehouses(): void {
    this.server.getQuery<GenericResponse<boolean>>('/storehouse').subscribe(data => {
      if (data.isSuccess) {
        this._storehouses = data.data;
        if (this._storehouses.length != 0 || this.selectedStorehouse == null) {
          this.setSelectedStorehouseInPanel(this._storehouses[0]);
          localStorage.setItem("colorOfHeader", '#' + this.selectedStorehouse.colorHex.slice(2));
        }
      }
      else {
        this.alertManager.showError(data.error.errorMessage);
      }
    });
  }

  public async getStorehousesAsync() {
    var data = await this.server.getQueryPromise<GenericResponse<boolean>>('/storehouse');

    if (data.isSuccess) {
      this._storehouses = data.data;
    }
    else {
      this.alertManager.showError(data.error.errorMessage);
    }

    if (this._storehouses.length != 0 || this.selectedStorehouse == null) {
      this.setSelectedStorehouseInPanel(this._storehouses[0]);
      localStorage.setItem("colorOfHeader", '#' + this.selectedStorehouse.colorHex.slice(2));
    }
  }

  public setSelectedStorehouseInPanel(storehouse: Storehouse) {
    this._selectedStorehouseInPanel = storehouse;
    localStorage.setItem("SelectedStorehouseInPanel", JSON.stringify(storehouse))
  }

  public saveStorehouseInfoForCreateProductItem(storehouse: Storehouse) {
    localStorage.setItem("StorehouseInfoForCreateProductItem", JSON.stringify(storehouse))
  }

  public getStorehouseInfoForCreateProductItem(): Storehouse {
    let storehouse = localStorage.getItem("StorehouseInfoForCreateProductItem");
    return JSON.parse(storehouse);
  }

  public deleteStorehouseForCreateProductItem() {
    localStorage.removeItem("StorehouseInfoForCreateProductItem");
  }
}