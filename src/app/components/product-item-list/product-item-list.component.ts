import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ServerConnectionService } from '../../services/server-connection.service';
import { ProductType } from '../../models/product-type';
import { GenericResponse } from '../../models/generic-response';
import { AlertManagerService } from '../../services//alert-manager.service';
import { MatTableDataSource } from '@angular/material/table';
import { stringify } from '@angular/compiler/src/util';
import {AuthorizationService} from '../../services/authorization.service';
import { Storehouse } from '../../models/storehouse';
import { StorehouseService } from '../../services/storehouse.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-product-item-list',
  templateUrl: './product-item-list.component.html',
  styleUrls: ['./product-item-list.component.css']
})
export class ProductItemListComponent implements OnInit {
  //@Output() public headerStorehouseEmitter = new EventEmitter();

  constructor(private server: ServerConnectionService,
    private alertManager: AlertManagerService,
    public authorizationService: AuthorizationService,
    private storehouseService: StorehouseService) { }

  ngOnInit(): void {
    console.log(this.storehouseService.storehouses);
    delay(5000);
    console.log("this.storehouseService.storehouse");
    console.log(this.storehouseService.storehouses);
    //this.headerStorehouseEmitter.emit();
    // this.server.getQuery<GenericResponse<boolean>>('/storehouse').subscribe(data => {
    //   if (data.isSuccess)
    //   {
    //     this.storehouseService.setCurrentSStorehouses(data.data);
    //   }
    //   else
    //     this.alertManager.showError(data.error.errorMessage);
    // });
  }
}

