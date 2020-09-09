import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {

  constructor(private tokenService:TokenService,private router: Router) { }

  ngOnInit(): void {
    if(this.tokenService.get() != null){
      this.tokenService.drop();
      this.router.navigate(['log-in']);
    }
  }

}
