import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ServerConnectionService } from '../../services/server-connection.service';
import { GenericResponse } from '../../models/generic-response';
import { AlertManagerService } from '../../services//alert-manager.service';
import { MatTableDataSource } from '@angular/material/table';
import { stringify } from '@angular/compiler/src/util';
import {AuthorizationService} from '../../services/authorization.service';
import { Storehouse } from '../../models/storehouse';
import { StorehouseService } from '../../services/storehouse.service';
import { ProductItem } from '../../models/product-item';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-item-list',
  templateUrl: './product-item-list.component.html',
  styleUrls: ['./product-item-list.component.css']
})
export class ProductItemListComponent implements OnInit {

  public productItems: ProductItem[];
  // private test = this.testdd();

  constructor(private server: ServerConnectionService,
    private alertManager: AlertManagerService,
    public authorizationService: AuthorizationService,
    private storehouseService: StorehouseService,
    private activateRoute: ActivatedRoute) {
     }

  ngOnInit(): void {
    this.getProductItems();
    this.storehouseService.trigger$.subscribe(() => this.getProductItems());
  }

  public async getProductItems(): Promise<void> {
    if (this.storehouseService.isEmpty && this.storehouseService.selectedStorehouse == undefined) 
      await this.storehouseService.getStorehousesAsync()
    
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

