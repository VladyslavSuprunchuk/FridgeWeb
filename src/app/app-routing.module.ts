import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductItemListComponent } from './components/product-item-list/product-item-list.component';
import { ProductTypeListComponent } from './components/product-type-list/product-type-list.component';
import { ProductTypeEditComponent } from './components/product-type-edit/product-type-edit.component';
import { StorehouseEditComponent } from './components/storehouse-edit/storehouse-edit.component';
import { StorehouseListComponent } from './components/storehouse-list/storehouse-list.component';
import { StorehouseJoinComponent } from './components/storehouse-join/storehouse-join.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { MembersComponent } from './components/members/members.component';
import { ProductItemEditComponent } from './components/product-item-edit/product-item-edit.component';
import { LogInComponent } from './components/log-in/log-in.component';


const routes: Routes = [
  { path: 'log-in', component: LogInComponent },
  { path: 'product-item-list', component: ProductItemListComponent },
  { path: 'product-item-edit/:id', component: ProductItemEditComponent },
  { path: 'product-type-list/:isForCreateProductItem', component: ProductTypeListComponent },
  { path: 'product-type-edit/:id', component: ProductTypeEditComponent },
  { path: 'product-type-edit/:id/:isCreate', component: ProductTypeEditComponent },
  { path: 'storehouse-list/:isForCreateProductItem', component: StorehouseListComponent },
  { path: 'storehouse-edit/:id', component: StorehouseEditComponent },
  { path: 'members/:id', component: MembersComponent },
  { path: 'storehouse-join', component: StorehouseJoinComponent },
  { path: '', redirectTo: '/log-in', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),  ShareButtonsModule,ShareIconsModule ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
