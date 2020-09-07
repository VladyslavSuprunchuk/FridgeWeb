import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductItemListComponent } from './components/product-item-list/product-item-list.component';
import { ProductTypeListComponent } from './components/product-type-list/product-type-list.component';
import { ProductTypeEditComponent } from './components/product-type-edit/product-type-edit.component';
import { StorehouseComponent } from './components/storehouse/storehouse.component';
import { LogInComponent } from './components/log-in/log-in.component';


const routes: Routes = [
  { path: 'product-item-iist', component: ProductItemListComponent},
  { path: '', redirectTo: '/product-item-iist', pathMatch: 'full' },
  { path: 'product-type-list', component: ProductTypeListComponent},
  {path: 'product-type-edit/:id', component: ProductTypeEditComponent},
  {path: 'storehouse', component: StorehouseComponent},
  {path: 'login', component: LogInComponent}
 // {path: 'mediaservice', component: MediaServiceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
