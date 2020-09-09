import { Component, OnInit } from '@angular/core';
import { ServerConnectionService } from '../../services/server-connection.service';
import { ProductType } from '../../Models/ProductType';
import { GenericResponse } from '../../Models//GenericResponse'


@Component({
  selector: 'app-product-type-list',
  templateUrl: './product-type-list.component.html',
  styleUrls: ['./product-type-list.component.css']
})

export class ProductTypeListComponent implements OnInit {

  public displayedColumns: string[] = ['imageUrl', 'name', 'expirationTerm'];
  public dataSources: ProductType[];
  public productTypes: ProductType[];

  constructor(private server: ServerConnectionService) { }

  ngOnInit(): void {
    debugger;
    this.server.getQuery<GenericResponse<boolean>>('/producttype').subscribe(data => {
      if (data.isSuccess) {
        this.productTypes = data.data;
        this.dataSources = this.productTypes;
      }
    });
  }
}
