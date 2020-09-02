import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerConnectionService } from '../../services/server-connection.service';
import { GenericResponse } from '..//../Models//GenericResponse';
import { ProductType } from '..//..//Models//ProductType';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertManagerService } from '..//..//services//alert-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-type-edit',
  templateUrl: './product-type-edit.component.html',
  styleUrls: ['./product-type-edit.component.css']
})
export class ProductTypeEditComponent implements OnInit {

  id: number;
  public productType: ProductType = new ProductType();
  public productTypeForm: FormGroup;

  constructor(private activateRoute: ActivatedRoute,
    private server: ServerConnectionService,
    private fb: FormBuilder,
    private alertManager: AlertManagerService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.formInitialization();
    this.id = this.activateRoute.snapshot.params['id'];
    this.server.getQuery<GenericResponse<boolean>>('/producttype/' + this.id).subscribe(data => {
      if (data.isSuccess) {
        this.productType = data.data;
        this.formInitialization();
      }
    });
  }

  formInitialization() {
    this.productTypeForm = this.fb.group({
      id: [this.productType.id],
      name: [this.productType.name, Validators.required],
      description: [this.productType.description],
      unitName: [this.productType.unit.name],
      expirationTerm: [this.productType.expirationTerm],
      openedExpirationTerm: [this.productType.openedExpirationTerm]
    });
  }

  onSubmit() {
    this.server.putFormData<GenericResponse<boolean>>('/producttype/', this.productTypeForm.value, null).subscribe(data => {
      if (data.isSuccess) 
        this.alertManager.showSuccess("Product type successed  updated");    
      else
        this.alertManager.showError("Error"); 
    })
  }

  delete():void{
    this.server.deleteQuery<GenericResponse<boolean>>('/producttype/'+this.productType.id).subscribe(data => {
      if (data.isSuccess) 
        this.router.navigate(['product-type-list']);   
      else
        this.alertManager.showError("Error"); 
    })
  }
}
