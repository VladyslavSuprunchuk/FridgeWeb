import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthorizationService } from '../../../services/authorization.service';
import { Router } from '@angular/router';
import { StorehouseService } from 'src/app/services/storehouse.service';
 
@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  constructor(private authorizationService:AuthorizationService,
    private router: Router,
    private storehouseSerivce:StorehouseService) { }
 
  ngOnInit() {
  }
 
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  public onLogoutClick(){
    this.storehouseSerivce.resetListOfStorehouses();
    this.storehouseSerivce.selectedStorehouseInPanel = null;
    localStorage.removeItem("colorOfHeader");
    this.onSidenavClose();
    this.authorizationService.dropToken();
    this.router.navigate(['']);
  }
}
