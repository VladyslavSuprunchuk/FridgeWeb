import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder ,Validators } from '@angular/forms';
import { GenericResponse } from '../../models/generic-response';
import { ServerConnectionService } from '../../services/server-connection.service';
import { AlertManagerService } from '../../services//alert-manager.service';
import { Client } from '../../models/client';
import { Router } from '@angular/router';
import { AuthorizationService }  from '../../services/authorization.service'
import { StorehouseService } from 'src/app/services/storehouse.service';
import { Guid } from '../../shared/guid';

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
  private deviceId: string;

  constructor(private server: ServerConnectionService,
    private alertManager: AlertManagerService,
    private router: Router,
    private fb: FormBuilder,
    private authorizationService: AuthorizationService) { }

  ngOnInit() {
    this.deviceId = Guid.newGuid();
    localStorage.setItem("deviceId", this.deviceId);
    this.formInitialization();
    var token = this.authorizationService.getToken();
    if (token != null) {
      this.router.navigate(['product-item-list']);
    }
  }

  private formInitialization(){
    this.loginForm = this.fb.group({
      name: [],
      email: [],
      password: [],
      deviceId: [this.deviceId],
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
          this.router.navigate(['product-item-list']);   
        }
        else
        if(data.error != null){
          this.alertManager.showError(data.error.errorMessage);
        }
        else{
          this.alertManager.showError("Internal Error");
        }
      });
    }     
  }

  private saveUserInfo(data:any){
    this.client=data.data;
    localStorage.setItem("userInfo",JSON.stringify(this.client))
    localStorage.setItem("token",this.client.token);
  }

  private signUp() {
    if (this.loginForm.valid) {
      this.server.postQuery<GenericResponse<boolean>>("/signUp", this.loginForm.value).subscribe(data => {
        if (data.isSuccess) {
          this.saveUserInfo(data);
          this.router.navigate(['product-item-list']);
        }
        else
        if(data.error != null){
          this.alertManager.showError(data.error.errorMessage);
        }
        else{
          this.alertManager.showError("Internal Error");
        }
      });
    }
  }
}
