import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StorehouseService } from '../../../services/storehouse.service';
import { Router } from '@angular/router';
import { Storehouse } from 'src/app/models/storehouse';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  constructor(public storehouseService: StorehouseService, public router: Router) {
  }

  ngOnInit(): void {
  };

  public getIndex(): number {
    if (this.storehouseService.selectedStorehouse != null) {
      for (var i = 0; i < this.storehouseService.storehouses.length; i += 1) {
        if (this.storehouseService.storehouses[i].id === this.storehouseService.selectedStorehouse.id) {
          return i;
        }
      }
    }
    return -1;
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  public getColor(): string {
    if (!window.location.href.includes('/storehouse-edit/0')
      && window.location.href.includes('/storehouse-edit/')
      || window.location.href.includes('/product-item-list')) {
      return this.storehouseService.getColorOfHeader();
    }
  }

  public setSelectedStorehouse(storehouse: Storehouse) {
    this.storehouseService.setSelectedStorehouseInPanel(storehouse);
    this.storehouseService.triggerOnChangeSelectedStorehouse();
    localStorage.setItem("colorOfHeader", '#' + storehouse.colorHex.slice(2))
  }

  public isNeedStorehouses(): boolean {
    return window.location.href.includes('/product-item-list');
  }
}
