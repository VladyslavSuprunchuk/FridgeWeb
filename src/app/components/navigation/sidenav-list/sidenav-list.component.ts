import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthorizationService } from '../../../services/authorization.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  constructor(private authorizationService:AuthorizationService,private router: Router) { }
 
  ngOnInit() {
  }
 
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  public onLogoutClick(){
    this.onSidenavClose();
    this.authorizationService.dropToken();
    this.router.navigate(['']);
  }
}
