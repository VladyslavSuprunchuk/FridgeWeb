import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder ,Validators } from '@angular/forms';
import { GenericResponse } from '../../models/generic-response';
import { ServerConnectionService } from '../../services/server-connection.service';
import { AlertManagerService } from '../../services//alert-manager.service';
import { Storehouse } from '../../models/storehouse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-storehouse-join',
  templateUrl: './storehouse-join.component.html',
  styleUrls: ['./storehouse-join.component.css']
})
export class StorehouseJoinComponent implements OnInit {

  public  hide = true;
  public storehouseJoinForm: FormGroup;

  constructor(private server: ServerConnectionService,
    private fb: FormBuilder,
    private alertManager: AlertManagerService,
    private router: Router) { }

  ngOnInit(): void {
    this.storehouseJoinForm = new FormGroup({
      storehouseId: new FormControl(),
      storehousePassword: new FormControl()
    });
  }

  private formInitialization(){
    this.storehouseJoinForm = this.fb.group({
      storehouseId: [],
      storehousePassword: []
    });
  }
  onSubmit() {
    if (this.storehouseJoinForm.valid) {
      let storehouse = new Storehouse();
      storehouse.id = this.storehouseJoinForm.value.storehouseId;
      storehouse.password = this.storehouseJoinForm.value.storehousePassword;
      debugger;
      this.server.postQuery<GenericResponse<boolean>>("/storehouse/join", storehouse).subscribe(data => {
        if (data.isSuccess) {
          this.router.navigate(['storehouse-list']);  
          this.alertManager.showSuccess("You successfully join to storehouse");
        }
        else
          this.alertManager.showError(data.error.errorMessage);
      });
    }   
 }
}
