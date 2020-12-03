import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { StorehouseService } from '../../../services/storehouse.service';
import { Router } from '@angular/router';
import {Observable, Observer} from 'rxjs';
import { Storehouse } from 'src/app/models/storehouse';
import { ProductItemListComponent } from '../../product-item-list/product-item-list.component';
import { ProductTypeService } from 'src/app/services/productType.service';
import {FormControl} from '@angular/forms';



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

  public getIndex():number{
    debugger;
    //let value = this.storehouseService.storehouses.(this.storehouseService.selectedStorehouse);
    //return value;
    return findWithAttr(this.storehouseService.storehouses, this.storehouseService.selectedStorehouse.id);

    function findWithAttr(array:Storehouse[], value) {
      for(var i = 0; i < array.length; i += 1) {
          if(array[i].id === value) {
              return i;
          }
      }
      return -1;
    }
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  public getColor():string{
    if(!window.location.href.includes('/storehouse-edit/0') && window.location.href.includes('/storehouse-edit/') 
    || window.location.href.includes('/product-item-list'))
      return this.storehouseService.getColorOfHeader();
    
  }

  public setSelectedStorehouse(storehouse:Storehouse){
    localStorage.setItem("SelectedStorehouseInPanel", JSON.stringify(storehouse));
    this.storehouseService.triggerOnChangeSelectedStorehouse();
    localStorage.setItem("colorOfHeader",'#'+ storehouse.colorHex.slice(2))
  }

  public isNeedStorehouses():boolean{
    return window.location.href.includes('/product-item-list');
  }
}
