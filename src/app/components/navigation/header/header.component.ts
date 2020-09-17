import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ColorService } from '../../../services/color.service';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();
 
  constructor(public colorService:ColorService,public router: Router,public urlService:UrlService) { }
  
  ngOnInit(): void {
  };
 
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

}
