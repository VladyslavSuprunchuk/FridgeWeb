import { Component, OnInit } from '@angular/core';
import { GenericResponse } from '../../models/generic-response';
import { AlertManagerService } from '../../services/alert-manager.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServerConnectionService } from '../../services/server-connection.service';
import { Storehouse } from '../../models/storehouse';

@Component({
  selector: 'app-storehouse-edit',
  templateUrl: './storehouse-edit.component.html',
  styleUrls: ['./storehouse-edit.component.css']
})
export class StorehouseEditComponent implements OnInit {

  public id: number;
  public storehouseForm: FormGroup;
  public fileToUpload: File = null;
  public storehouse:Storehouse = new Storehouse();

  constructor(private activateRoute: ActivatedRoute,
    private server: ServerConnectionService,
    private fb: FormBuilder,
    private alertManager: AlertManagerService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params['id'];
    this.formEmptyInitialization();
    if (this.id != 0) {
      this.server.getQuery<GenericResponse<boolean>>('/storehouse/' + this.id).subscribe(data => {
        if (data.isSuccess) {
          this.storehouse = data.data;
          this.formInitialization();
          localStorage.setItem("colorOfHeader",this.storehouseForm.value.colorHex);
        }
      });
    }
  }

  onSubmit() {
    if (this.storehouseForm.valid) {
      if (this.id != 0) {
        this.update();
      } else {
        this.create();
      }
    }
  }

  private update() {
    this.storehouseForm.value.colorHex = this.storehouseForm.value.colorHex.replace('#','FF');
    this.server.putFormData<GenericResponse<boolean>>('/storehouse/', this.storehouseForm.value, this.fileToUpload).subscribe(data => {
      if (data.isSuccess) {
        this.router.navigate(['storehouse-list']);
        this.alertManager.showSuccess("Storehouse was updated successfully");
      }
      else
        this.alertManager.showError(data.error.errorMessage);
    })
  }

  private create() {
     this.storehouseForm.value.colorHex = this.storehouseForm.value.colorHex.replace('#','FF');
    this.server.postFormData<GenericResponse<boolean>>('/storehouse/', this.storehouseForm.value, this.fileToUpload).subscribe(data => {
      if (data.isSuccess) {
        this.router.navigate(['storehouse-list']);
        this.alertManager.showSuccess("Storehouse type has been created");
      }
      else
        this.alertManager.showError(data.error.errorMessage);
    })
  }

  delete(): void {
    this.server.deleteQuery<GenericResponse<boolean>>('/storehouse/' + this.storehouse.id).subscribe(data => {
      if (data.isSuccess){
        this.router.navigate(['storehouse-list']);
        this.alertManager.showSuccess("Storehouse has been deleted");
      }
      else{
         this.alertManager.showError(data.error.errorMessage);
      }
    })
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  private formEmptyInitialization() {
    this.storehouseForm = this.fb.group({
      id: ['0'],
      title: ['', Validators.required],
      password: ['', Validators.required],
      colorHex: ['', [Validators.required]]
    });
  }

  private formInitialization() {
    this.storehouseForm = this.fb.group({
      id: [this.storehouse.id],
      title: [this.storehouse.title, Validators.required],
      password: [this.storehouse.password, Validators.required],
      colorHex: ['#'+this.storehouse.colorHex.slice(2), [Validators.required]]
    });
  }
}
