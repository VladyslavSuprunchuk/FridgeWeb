import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GenericResponse } from '../../Models/GenericResponse';
import { ServerConnectionService } from '../../services/server-connection.service';
import { AlertManagerService } from '../../services//alert-manager.service';
import { Client } from '../../Models/Client'
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  hide = true;
   loginForm: FormGroup;
   private client: Client;

  constructor(private server: ServerConnectionService,private alertManager: AlertManagerService, private router: Router) { }

  ngOnInit() {

    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  onSubmit() {
      if (this.loginForm.valid) {
        this.server.postQuery<GenericResponse<boolean>>("/login", this.loginForm.value).subscribe(data => {
          if (data.isSuccess) {
            this.client=data.data;
            localStorage.setItem("token",this.client.token);
            console.log(this.client.token);
            this.router.navigate(['product-type-list']);   
          }
          else
            this.alertManager.showSuccess("Error");
        });
      }     
     }

}
