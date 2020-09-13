import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerConnectionService } from '../../services/server-connection.service';
import { GenericResponse } from '../../models/generic-response';
import { ProductType } from '../../models/product-type';
import { AlertManagerService } from '../../services/alert-manager.service';
import { Router } from '@angular/router';
import { UnitsService } from '../../services/units.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { notZeroValidator, } from '../../shared/validation';

@Component({
  selector: 'app-product-type-edit',
  templateUrl: './product-type-edit.component.html',
  styleUrls: ['./product-type-edit.component.css']
})
export class ProductTypeEditComponent implements OnInit {

  public id: number;
  public productType: ProductType = new ProductType();
  public productTypeForm: FormGroup;
  public fileToUpload: File = null;

  constructor(private activateRoute: ActivatedRoute,
    private server: ServerConnectionService,
    private fb: FormBuilder,
    private alertManager: AlertManagerService,
    public unitService: UnitsService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params['id'];
    this.formInitialization();

    if (this.id != 0) {
      this.server.getQuery<GenericResponse<boolean>>('/producttype/' + this.id).subscribe(data => {
        if (data.isSuccess) {
          this.productType = data.data;
          this.formInitialization();
        }
      });
    }
  }

  private formInitialization() {
    this.productTypeForm = this.fb.group({
      id: [this.productType.id],
      name: [this.productType.name, Validators.required],
      description: [this.productType.description],
      unitId: [this.productType.unit.id, [Validators.required, notZeroValidator]],
      expirationTerm: [this.productType.expirationTerm],
      openedExpirationTerm: [this.productType.openedExpirationTerm]
    });
    
    if (this.id != 0) {
      this.productTypeForm.get('unitId').disable();
    }
  }

  onSubmit() {
    if (this.productTypeForm.valid) {
      if (this.id != 0) {
        this.update();
      } else {
        this.create();
      }
    }
  }

  private update() {
    this.server.putFormData<GenericResponse<boolean>>('/producttype/', this.productTypeForm.value, this.fileToUpload).subscribe(data => {
      if (data.isSuccess) {
        this.router.navigate(['product-type-list']);
        this.alertManager.showSuccess("Product type was updated successfully");
      }
      else
        this.alertManager.showError(data.error.errorMessage);
    })
  }

  private create() {
    this.server.postFormData<GenericResponse<boolean>>('/producttype/', this.productTypeForm.value, this.fileToUpload).subscribe(data => {
      if (data.isSuccess) {
        this.router.navigate(['product-type-list']);
        this.alertManager.showSuccess("Product type has been created");
      }
      else
        this.alertManager.showError(data.error.errorMessage);
    })
  }

  delete(): void {
    this.server.deleteQuery<GenericResponse<boolean>>('/producttype/' + this.productType.id).subscribe(data => {
      if (data.isSuccess){
        this.router.navigate(['product-type-list']);
        this.alertManager.showSuccess("Product type has been deleted");
      }
      else{
         this.alertManager.showError(data.error.errorMessage);
      }
    })
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
}
