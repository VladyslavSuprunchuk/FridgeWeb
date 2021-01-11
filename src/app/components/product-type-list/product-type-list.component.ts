import { Component, OnInit } from '@angular/core';
import { ServerConnectionService } from '../../services/server-connection.service';
import { ProductType } from '../../models/product-type';
import { GenericResponse } from '../../models/generic-response';
import { AlertManagerService } from '../../services//alert-manager.service';
import { AuthorizationService } from '../../services/authorization.service';
import { Author } from '../../models/author';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductTypeService } from '../../services/productType.service'
import { Client } from 'src/app/models/client';


@Component({
  selector: 'app-product-type-list',
  templateUrl: './product-type-list.component.html',
  styleUrls: ['./product-type-list.component.css']
})

export class ProductTypeListComponent implements OnInit {

  public displayedColumns: string[] = ['imageUrl', 'name', 'expirationTerm', 'additionalInfo'];
  public productTypes: ProductType[];
  public productTypesForTable: Array<ProductType[]> = new Array<ProductType[]>();
  public productTypesFromFilter: ProductType[];
  public authors: Author[];
  public filterName: string;
  public currentUser:Client;
  public isForCreateProductItem:boolean = false;

  constructor(private server: ServerConnectionService,
    private alertManager: AlertManagerService,
    public authorizationService: AuthorizationService,
    private productTypeService: ProductTypeService,
    private router: Router,
    private activateRoute: ActivatedRoute) { 
       this.currentUser = this.authorizationService.getUserinfo();
    }

  ngOnInit(): void {
    this.isForCreateProductItem = this.activateRoute.snapshot.params['isForCreateProductItem'] == "true";
    this.server.getQuery<GenericResponse<boolean>>('/producttype').subscribe(data => {
      if (data.isSuccess) {
        this.productTypes = data.data;
         if (this.isForCreateProductItem == true) {
           this.productTypes = this.productTypes.filter(x => x.isHidden == false)
        }

        this.productTypesForTable = this.getProductTypesByDistinctAuthors(this.productTypes);
      }
      else {
        this.alertManager.showError(data.error.errorMessage);
      }
    });
  }

  public setHide(id: number) {
    this.server.postQuery<GenericResponse<boolean>>('/producttype/' + id + '/sethidden', null).subscribe(data => {
      if (data.isSuccess) {
        var producttype = this.productTypes.find(x => x.id == id);
        var message: string;

        if (producttype.isHidden == true) {
          message = "Product Type was set  visible";
        }
        else {
          message = "Product Type was set  hidden";
        }

        this.ngOnInit();
        this.alertManager.showSuccess(message);
      }
      else {
        this.alertManager.showError(data.error.errorMessage);
      }
    });
  }

  public getOpacity(id: number): string {
    var producttype = this.productTypes.find(x => x.id == id)

    if (producttype.isHidden) {
      return "0.7"
    }
  }

  public setSelectedProductTypeForProductItem(productType: ProductType) {
    this.productTypeService.saveProductTypeInfoForCreateProductItem(productType);
    this.router.navigate(['product-item-edit/0']);
  }

  public delete(id:number): void {
    this.server.deleteQuery<GenericResponse<boolean>>('/producttype/' + id).subscribe(data => {
      if (data.isSuccess){
        this.router.navigate(['product-type-list/false']);
        this.alertManager.showSuccess("Product type has been deleted");
      }
      else{
         this.alertManager.showError(data.error.errorMessage);
      }
    })
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
      .filter((value, index, self) => self.indexOf(value) === index);

    if(distinctAuthors.includes(this.currentUser.email)){
      distinctAuthors.splice(distinctAuthors.indexOf(this.currentUser.email), 1)
      distinctAuthors.unshift(this.currentUser.email);
    }

    for (var i = 0; i < distinctAuthors.length; i++)
      productTypesForTable.push(productTypes.filter(x => x.userAuthor.email == distinctAuthors[i]))

    return productTypesForTable;
  }
}
