import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder ,Validators } from '@angular/forms';
import { GenericResponse } from '../../models/generic-response';
import { ServerConnectionService } from '../../services/server-connection.service';
import { AlertManagerService } from '../../services//alert-manager.service';
import { Client } from '../../models/client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  hide = true;
   public loginForm: FormGroup;
   private client: Client;
   public isWantToCreateAccount:boolean = false;

  constructor(private server: ServerConnectionService,
    private alertManager: AlertManagerService,
     private router: Router,
     private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      password: new FormControl()
    });
    this.formInitialization();
  }

  private formInitialization(){
    this.loginForm = this.fb.group({
      name: [],
      email: [],
      password: [],
      deviceId: [],
    });
  }

  onSubmit() {
     if(!this.isWantToCreateAccount)
        this.logIn();  
     else
      this.signUp();
  }

  changeForm(){  
    this.isWantToCreateAccount = !this.isWantToCreateAccount;
  }

  private logIn(){
    if (this.loginForm.valid) {
      this.server.postQuery<GenericResponse<boolean>>("/login", this.loginForm.value).subscribe(data => {
        if (data.isSuccess) {
          this.saveUserInfo(data);
          this.router.navigate(['product-type-list']);   
        }
        else
          this.alertManager.showError(data.error.errorMessage);
      });
    }     
  }

  private saveUserInfo(data:any){
    this.client=data.data;
    localStorage.setItem("token",this.client.token);
  }

  private signUp() {
    if (this.loginForm.valid) {
      this.server.postQuery<GenericResponse<boolean>>("/signUp", this.loginForm.value).subscribe(data => {
        if (data.isSuccess) {
          this.saveUserInfo(data);
          this.router.navigate(['product-type-list']);
        }
        else
        this.alertManager.showSuccess(data.error.errorMessage);
      });
    }
  }
}
