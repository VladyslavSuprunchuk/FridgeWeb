import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { from } from 'rxjs';
import { GenericResponse } from '../models/generic-response';
import { Storehouse } from '../models/storehouse'
import { AlertManagerService } from './alert-manager.service';
import { ServerConnectionService } from './server-connection.service';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StorehouseService {

  constructor(private server: ServerConnectionService, private alertManager: AlertManagerService) {
  }

  private _storehouses: Storehouse[] = [];
  public selectedStorehouse: Storehouse;

  private _trigger = new Subject<void>();

  get trigger$() {
    return this._trigger.asObservable();
  }

  public triggerOnChangeSelectedStorehouse() {
    this._trigger.next();
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

  public getColorOfHeader(): string {
    return localStorage.getItem("colorOfHeader");
  }

  public dropColorOfHeader(): void {
    localStorage.removeItem("colorOfHeader");
  }

  public downloadStorehouses(): void {
    this.server.getQuery<GenericResponse<boolean>>('/storehouse').subscribe(data => {
      if (data.isSuccess)
        this._storehouses = data.data;
      else
        this.alertManager.showError(data.error.errorMessage);

    });
  }

  async getStorehousesAsync() {
    var data = await this.server.getQueryPromise<GenericResponse<boolean>>('/storehouse');

    if (data.isSuccess)
      this._storehouses = data.data;
    else
      this.alertManager.showError(data.error.errorMessage);

    if (this._storehouses.length != 0 && this.selectedStorehouse == null) {
      this.selectedStorehouse = this._storehouses[0];
      localStorage.setItem("colorOfHeader", '#' + this.selectedStorehouse.colorHex.slice(2))
    }
  } 
}