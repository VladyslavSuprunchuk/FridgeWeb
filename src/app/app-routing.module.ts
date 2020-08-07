import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductItemListComponent } from './components/product-item-list/product-item-list.component';


const routes: Routes = [
  { path: 'product-item-iist', component: ProductItemListComponent},
  { path: '', redirectTo: '/product-item-iist', pathMatch: 'full' }
  //{path: 'products/:id', component: ProductDetailsComponent},
 // {path: 'mediaservice', component: MediaServiceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
