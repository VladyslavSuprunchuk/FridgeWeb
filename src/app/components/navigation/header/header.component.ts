import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StorehouseService } from '../../../services/storehouse.service';
import { Router } from '@angular/router';
import {Observable, Observer} from 'rxjs';
import { Storehouse } from 'src/app/models/storehouse';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();
  public storehouses: Storehouse[];

  constructor(public storehouseService:StorehouseService,public router: Router) { }
  
  ngOnInit(): void {
    this.storehouses = this.storehouseService.getCurrentStorehouses();
  };
 
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  public getColor():string{
    if(!window.location.href.includes('/storehouse-edit/0') && window.location.href.includes('/storehouse-edit/'))
      return this.storehouseService.getColorOfHeader();
  }

  public isNeedStorehouses():boolean{
    return window.location.href.includes('/product-item-list');
  }

  ngAfterViewInit(): void {
    document.getElementsByClassName('mat-tab-header-pagination-before')[0].remove();
    document.getElementsByClassName('mat-tab-header-pagination-after')[0].remove();
  }
}
