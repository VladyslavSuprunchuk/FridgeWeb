import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GenericResponse } from '../Models/GenericResponse';
import { ServerConnectionService } from '../services/server-connection.service';
import { AlertManagerService } from '../services/alert-manager.service';
import { client } from '../Models/Client'
import { LocalStorage } from '../services/LocalStorage';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  hide = true;
  public loginForm: FormGroup;
  public storage:LocalStorage;
  _client:client;

  constructor(private server: ServerConnectionService,public alertManager: AlertManagerService) { }

  ngOnInit() {

    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });

  }
  
onSubmit() {
  console.log("TES");
    if (this.loginForm.valid) {
      let srt = "/login/";
      console.log(this.loginForm.value);
      this.server.postQuery<GenericResponse<boolean>>(srt, this.loginForm.value).subscribe(data => {
        if (data.isSuccess) {
          this._client=data.data;
          console.log(this._client)
          console.log(data.data.token);
          this.storage= new LocalStorage();
          this.storage.setToken(data.data.token);
        }
        else
          this.alertManager.showSuccess("Error");
      });
    }
  }

}
