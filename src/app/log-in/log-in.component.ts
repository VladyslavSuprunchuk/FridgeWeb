import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GenericResponse } from '../GenericRespons/GenericResponse';
import { ServerConnectionService } from '../services/server-connection.service';
import { AlertManagerService } from '../services/alert-manager.service'

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  hide = true;
  public loginForm: FormGroup;
  public storage:LocalStorage
  constructor(private server: ServerConnectionService,public alertManager: AlertManagerService) { }

  ngOnInit() {

    this.loginForm = new FormGroup({
      login: new FormControl(),
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
          this.storage.SetToken(data.data);
          //вызов компонента
        }
        else
          this.alertManager.showSuccess("Error");
      });
    }
  }

}
