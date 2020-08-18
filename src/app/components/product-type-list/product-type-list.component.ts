import { Component, OnInit } from '@angular/core';
import { ServerConnectionService } from '../../services/server-connection.service';
import { ProductTypeClient } from '../../Models/ProductTypeClient';
import { GenericResponse } from '..//../Models//GenericResponse'


@Component({
  selector: 'app-product-type-list',
  templateUrl: './product-type-list.component.html',
  styleUrls: ['./product-type-list.component.css']
})

export class ProductTypeListComponent implements OnInit {

  public displayedColumns: string[] = ['imageUrl', 'name', 'expirationTerm'];
  public dataSource: ProductTypeClient[];

  public productTypeClients: ProductTypeClient[];

  constructor(private server: ServerConnectionService) { }

  ngOnInit(): void {
    this.server.getQuery<GenericResponse<boolean>>('/producttype').subscribe(data => {
      if (data.isSuccess) {
        this.productTypeClients = data.data;
        this.dataSource = this.productTypeClients;
      }
    });
  }

}
