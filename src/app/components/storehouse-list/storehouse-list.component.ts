import { Component, OnInit } from '@angular/core';
import { ServerConnectionService } from '../../services/server-connection.service';
import { Storehouse }from '../../models/storehouse';
import { GenericResponse } from '../../models/generic-response';
import { AlertManagerService } from '../../services//alert-manager.service';

@Component({
  selector: 'app-storehouse-list',
  templateUrl: './storehouse-list.component.html',
  styleUrls: ['./storehouse-list.component.css']
})
export class StorehouseListComponent implements OnInit {

  public storehouses: Storehouse[];
  public displayedColumns: string[] = ['imageUrl','title'];

  constructor(private server: ServerConnectionService,private alertManager:AlertManagerService) { }

  ngOnInit(): void {
    this.server.getQuery<GenericResponse<boolean>>('/storehouse').subscribe(data => {
      if (data.isSuccess) 
        this.storehouses = data.data;
      else
        this.alertManager.showError(data.error.errorMessage);
    });
  }

}