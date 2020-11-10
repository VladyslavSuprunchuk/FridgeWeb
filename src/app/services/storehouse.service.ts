import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { from } from 'rxjs';
import { GenericResponse } from '../models/generic-response';
import { Storehouse } from '../models/storehouse'
import { ServerConnectionService } from './server-connection.service';


@Injectable({
  providedIn: 'root'
})
export class StorehouseService {

  constructor(private server: ServerConnectionService) {

  }
  private _storehouses:Storehouse[] = [];

  get storehouses(): Storehouse[] {
    if(this._storehouses.length == 0)
    {
      this.downloadStorehouses()
    }

    return this._storehouses;
  }

  public getColorOfHeader():string {
    return localStorage.getItem("colorOfHeader");
  }

  public dropColorOfHeader():void {
    localStorage.removeItem("colorOfHeader");
  }

  public downloadStorehouses():void{
    this.server.getQuery<GenericResponse<boolean>>('/storehouse').subscribe(data => {
      if (data.isSuccess)
        this._storehouses = data.data;    
      // else  
      //   this.alertManager.showError(data.error.errorMessage);
      
    });
  }

  getCurrentStorehouses():Storehouse[]{
    return JSON.parse(localStorage.getItem("userStorehouses"));
  }
  
}