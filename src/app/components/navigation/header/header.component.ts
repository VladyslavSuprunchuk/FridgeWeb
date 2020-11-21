import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { StorehouseService } from '../../../services/storehouse.service';
import { Router } from '@angular/router';
import {Observable, Observer} from 'rxjs';
import { Storehouse } from 'src/app/models/storehouse';
import { ProductItemListComponent } from '../../product-item-list/product-item-list.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  constructor(public storehouseService:StorehouseService,public router: Router) {
   }
  
  ngOnInit(): void {
  };
 
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  public getColor():string{
    if(!window.location.href.includes('/storehouse-edit/0') && window.location.href.includes('/storehouse-edit/') 
    || window.location.href.includes('/product-item-list'))
      return this.storehouseService.getColorOfHeader();
    
  }

  public setSelectedStorehouse(storehouse:Storehouse){
    this.storehouseService.selectedStorehouse = storehouse;
    this.storehouseService.triggerOnChangeSelectedStorehouse();
    localStorage.setItem("colorOfHeader",'#'+ storehouse.colorHex.slice(2))
  }

  public isNeedStorehouses():boolean{
    return window.location.href.includes('/product-item-list');
  }
}
