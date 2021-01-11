import { Component, OnInit } from '@angular/core';
import { GenericResponse } from '../../models/generic-response';
import { AlertManagerService } from '../../services/alert-manager.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServerConnectionService } from '../../services/server-connection.service';
import { Storehouse } from '../../models/storehouse';
import { StorehouseService } from 'src/app/services/storehouse.service';

@Component({
  selector: 'app-storehouse-edit',
  templateUrl: './storehouse-edit.component.html',
  styleUrls: ['./storehouse-edit.component.css']
})
export class StorehouseEditComponent implements OnInit {

  public id: number;
  public storehouseForm: FormGroup;
  public fileToUpload: File = null;
  public storehouse: Storehouse = new Storehouse();

  constructor(private activateRoute: ActivatedRoute,
    private server: ServerConnectionService,
    private fb: FormBuilder,
    private alertManager: AlertManagerService,
    private router: Router,
    private storehouseService:StorehouseService) {
  }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params['id'];
    this.formEmptyInitialization();
    if (this.id != 0) {
      this.server.getQuery<GenericResponse<boolean>>('/storehouse/' + this.id).subscribe(data => {
        if (data.isSuccess) {
          this.storehouse = data.data;
          var str = '#' + this.storehouse.colorHex.slice(2);
          this.formInitialization();
          localStorage.setItem("colorOfHeader", str);
        }
        else {
          this.alertManager.showError(data.error.errorMessage);
        }
      });
    }
  }

  public onSubmit() {
    if (this.storehouseForm.valid) {
      this.storehouseForm.value.colorHex = this.storehouseForm.value.colorHex.replace('#', 'FF');
      this.storehouseForm.value.isLocked = this.storehouse.isLocked;
      if (this.id != 0) {
        this.update();
      }
      else {
        this.create();
      }
    }
  }

  private update() {
    this.server.putFormData<GenericResponse<boolean>>('/storehouse/', this.storehouseForm.value, this.fileToUpload).subscribe(data => {
      if (data.isSuccess) {
        this.router.navigate(['storehouse-list/false']);
        this.alertManager.showSuccess("Storehouse was updated successfully");
      }
      else {
        this.alertManager.showError(data.error.errorMessage);
      }
    })
  }

  private create() {
    this.server.postFormData<GenericResponse<boolean>>('/storehouse/', this.storehouseForm.value, this.fileToUpload).subscribe(data => {
      if (data.isSuccess) {
        this.storehouseService.downloadStorehouses();
        this.router.navigate(['storehouse-list/false']);
        this.alertManager.showSuccess("Storehouse type has been created");
      }
      else {
        this.alertManager.showError(data.error.errorMessage);
      }
    })
  }

  public delete(): void { 
    this.server.deleteQuery<GenericResponse<boolean>>('/storehouse/deletestorehouse/' + this.id).subscribe(data => {
      if (data.isSuccess) {

        if(this.storehouseService.selectedStorehouse.id == this.id){
          this.storehouseService.setSelectedStorehouseInPanel(null);
        }

        this.storehouseService.downloadStorehouses();
        this.router.navigate(['storehouse-list/false']);
        this.alertManager.showSuccess("Storehouse has been deleted");
      }
      else {
        this.alertManager.showError(data.error.errorMessage);
      }
    })
  }

  public handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  private formEmptyInitialization() {
    this.storehouseForm = this.fb.group({
      id: ['0'],
      title: ['', Validators.required],
      password: ['', Validators.required],
      colorHex: ['', [Validators.required]],
      isLocked: [false]
    });
  }

  public setIsLocked() {
    if (this.id == 0) {
      this.storehouse.isLocked = !this.storehouse.isLocked;
    }
  }

  private formInitialization() {
    this.storehouseForm = this.fb.group({
      id: [this.storehouse.id],
      title: [{ value: this.storehouse.title, disabled: !this.storehouse.isAuthor }, Validators.required],
      password: [{ value: this.storehouse.password, disabled: !this.storehouse.isAuthor }, Validators.required],
      colorHex: [{ value: '#' + this.storehouse.colorHex.slice(2), disabled: !this.storehouse.isAuthor }, Validators.required],
      isLocked: [{ value: this.storehouse.isLocked }, Validators.required]
    });
  }
}