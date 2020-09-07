import { Component, OnInit } from '@angular/core';
import { ServerConnectionService } from '../../services/server-connection.service';
import { Storehouse }from '..//..//Models//Storehouse';
import { GenericResponse } from '..//../Models//GenericResponse'

@Component({
  selector: 'app-storehouse',
  templateUrl: './storehouse.component.html',
  styleUrls: ['./storehouse.component.css']
})
export class StorehouseComponent implements OnInit {

  public storehouses: Storehouse[];
  public displayedColumns: string[] = ['imageUrl','title'];

  constructor(private server: ServerConnectionService) { }

  ngOnInit(): void {
    this.server.getQuery<GenericResponse<boolean>>('/storehouse').subscribe(data => {
      if (data.isSuccess) {
       this.storehouses = data.data;
       console.log(data.data);
      }
    });
  }

  Post():void {
    console.log("TEST");
  }

}
