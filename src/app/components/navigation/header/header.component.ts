import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ColorService } from '../../../services/color.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();
 
  constructor(public colorService:ColorService,public router: Router) { }
  
  ngOnInit(): void {
  };
 
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  public getColor():string{
    if(!window.location.href.includes('/storehouse-edit/0') && window.location.href.includes('/storehouse-edit/'))
      return this.colorService.get();
  }

}
