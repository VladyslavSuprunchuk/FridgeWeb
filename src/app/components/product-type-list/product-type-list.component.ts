import { Component, OnInit } from '@angular/core';
import { ServerConnectionService } from '../../services/server-connection.service';
import { ProductType } from '../../models/product-type';
import { GenericResponse } from '../../models/generic-response';
import { AlertManagerService } from '../../services//alert-manager.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-product-type-list',
  templateUrl: './product-type-list.component.html',
  styleUrls: ['./product-type-list.component.css']
})

export class ProductTypeListComponent implements OnInit {

  public displayedColumns: string[] = ['imageUrl', 'name', 'expirationTerm'];
  public productTypes: MatTableDataSource<ProductType>;
  public productTypesFiltered: ProductType[];
  public filterName:string;

  constructor(private server: ServerConnectionService,private alertManager: AlertManagerService,) { }

  ngOnInit(): void {
    this.server.getQuery<GenericResponse<boolean>>('/producttype').subscribe(data => {
      if (data.isSuccess) 
        this.productTypes = data.data;
      else
        this.alertManager.showError(data.error.errorMessage);
    });
  }

  filterTable (filterValue :string) { 
    this.productTypes.filter = filterValue.trim().toLowerCase(); 
 }
}
