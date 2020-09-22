import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductItemListComponent } from './components/product-item-list/product-item-list.component';
import { ProductTypeListComponent } from './components/product-type-list/product-type-list.component';
import { ProductTypeEditComponent } from './components/product-type-edit/product-type-edit.component';
import { StorehouseEditComponent } from './components/storehouse-edit/storehouse-edit.component';
import { StorehouseListComponent } from './components/storehouse-list/storehouse-list.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';



const routes: Routes = [
  { path: 'product-item-list', component: ProductItemListComponent},
  { path: 'product-type-list', component: ProductTypeListComponent},
  {path: 'product-type-edit/:id', component: ProductTypeEditComponent},
  {path: 'storehouse-list', component: StorehouseListComponent},
  {path: 'storehouse-edit/:id', component: StorehouseEditComponent},
  // {path: 'login', component: LogInComponent}
 // {path: 'mediaservice', component: MediaServiceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),  ShareButtonsModule,ShareIconsModule ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
