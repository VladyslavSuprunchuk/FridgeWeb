import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ServerConnectionService } from '../../services/server-connection.service';
import { GenericResponse } from '..//../Models//GenericResponse';
import { ProductType } from '..//..//Models//ProductType';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-type-edit',
  templateUrl: './product-type-edit.component.html',
  styleUrls: ['./product-type-edit.component.css']
})
export class ProductTypeEditComponent implements OnInit {

  id: number;
  public productType: ProductType = new ProductType();
  public productTypeForm: FormGroup;

  constructor(private activateRoute: ActivatedRoute,private server: ServerConnectionService, private fb: FormBuilder) 
  { 
  }

  ngOnInit(): void {
    this.FormInitialization();
    this.id = this.activateRoute.snapshot.params['id'];
    this.server.getQuery<GenericResponse<boolean>>('/producttype/'+this.id).subscribe(data => {
      if (data.isSuccess) {
        this.productType = data.data;
        this.FormInitialization();
      }
    });
  }

  FormInitialization() {
    this.productTypeForm = this.fb.group({
      name: [this.productType.name, Validators.required],
      description: [this.productType.description]
    });
  }

  onSubmit() {
    console.log("TESt"); 
    }

}
