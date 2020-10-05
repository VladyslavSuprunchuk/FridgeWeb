import { Component, OnInit } from '@angular/core';
import { ServerConnectionService } from '../../services/server-connection.service';
import { Storehouse }from '../../models/storehouse';
import { GenericResponse } from '../../models/generic-response';
import { AlertManagerService } from '../../services//alert-manager.service';
import { UrlService } from '../../services/url.service';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-storehouse-list',
  templateUrl: './storehouse-list.component.html',
  styleUrls: ['./storehouse-list.component.css']
})
export class StorehouseListComponent implements OnInit {

  public storehouses: Storehouse[];
  public displayedColumns: string[] = ['imageUrl','title'];

  constructor(private server: ServerConnectionService,
    private alertManager:AlertManagerService,
    public urlService:UrlService,
    public authorizationService:AuthorizationService) { }

  ngOnInit(): void {
    this.server.getQuery<GenericResponse<boolean>>('/storehouse').subscribe(data => {
      if (data.isSuccess) 
        this.storehouses = data.data;
      else
        this.alertManager.showError(data.error.errorMessage);
    });
  }

  delete(id:number){
    this.server.deleteQuery<GenericResponse<boolean>>('/storehouse/deletestorehouse/' + id).subscribe(data => {
      if (data.isSuccess) {
        this.alertManager.showSuccess("Storehouse has been deleted");
        this.ngOnInit()
      }
      else
        this.alertManager.showError(data.error.errorMessage);
    });
  }

  disconect(id:number){
    debugger;
    this.server.deleteQuery<GenericResponse<boolean>>('/storehouse/' + id + '/disconnect').subscribe(data => {
      if (data.isSuccess) {
        this.alertManager.showSuccess("You successfully disconnected");
        this.ngOnInit()
      }
      else
        this.alertManager.showError(data.error.errorMessage);
    });
  }
}
