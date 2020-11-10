import { Component, OnInit } from '@angular/core';
import { ServerConnectionService } from '../../services/server-connection.service';
import { ProductType } from '../../models/product-type';
import { GenericResponse } from '../../models/generic-response';
import { AlertManagerService } from '../../services//alert-manager.service';
import { MatTableDataSource } from '@angular/material/table';
import {AuthorizationService} from '../../services/authorization.service';
import { Author } from '../../models/author';

@Component({
  selector: 'app-product-type-list',
  templateUrl: './product-type-list.component.html',
  styleUrls: ['./product-type-list.component.css']
})

export class ProductTypeListComponent implements OnInit {

  public displayedColumns: string[] = ['imageUrl', 'name', 'expirationTerm' ,'additionalInfo'];
  public productTypes: ProductType[];
  public productTypesForTable: Array<ProductType[]> = new Array<ProductType[]>();
  public productTypesFromFilter: ProductType[];

  public authors:Author[];

  public filterName:string;

  constructor(private server: ServerConnectionService,
    private alertManager: AlertManagerService,
    public authorizationService: AuthorizationService) { }

  ngOnInit(): void {
    this.server.getQuery<GenericResponse<boolean>>('/producttype').subscribe(data => {
      if (data.isSuccess)
      {
          this.productTypes = data.data;
          this.productTypesForTable = this.getProductTypesByDistinctAuthors(this.productTypes);
      }
      else
        this.alertManager.showError(data.error.errorMessage);
    });
  }

  public setHide(id:number){
    this.server.postQuery<GenericResponse<boolean>>('/producttype/' + id + '/sethidden',null).subscribe(data => {
      if (data.isSuccess)
      {
        var producttype = this.productTypes.find(x=>x.id == id);
        var message:string;

        if(producttype.isHidden == true)
          message = "Product Type was set  visible"; 
        else
          message = "Product Type was set  hidden";

       this.ngOnInit();
       this.alertManager.showSuccess(message);
      }
      else
        this.alertManager.showError(data.error.errorMessage);
    });
  }

  public isAuthorProductType(email:string){
    var currentUser = this.authorizationService.getUserinfo();

    if(currentUser.email == email)
      return true
    else
      return false
  }

  public getOpacity(id:number):string{
    var producttype = this.productTypes.find(x=>x.id == id)

    if(producttype.isHidden)
      return "0.7"
    else
      return ""
    
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue == "") {
      this.productTypesForTable = this.getProductTypesByDistinctAuthors(this.productTypes)  
    }
    else {
      this.productTypesFromFilter = this.productTypes.filter(x => x.name.toLowerCase().includes(filterValue.toLowerCase().trim()) 
      || x.expirationTerm.toString().includes(filterValue.toLowerCase().trim()));
      this.productTypesForTable = this.getProductTypesByDistinctAuthors(this.productTypesFromFilter)
    }
  }

  private getProductTypesByDistinctAuthors(productTypes: ProductType[]): Array<ProductType[]> {
    let productTypesForTable = new Array<ProductType[]>();
    var distinctAuthors = productTypes.map(item => item.userAuthor.email)
      .filter((value, index, self) => self.indexOf(value) === index)

    for (var i = 0; i < distinctAuthors.length; i++)
      productTypesForTable.push(productTypes.filter(x => x.userAuthor.email == distinctAuthors[i]))
    return productTypesForTable;
  }

}
