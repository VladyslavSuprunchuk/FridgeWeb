import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Route, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', data: { title: 'First Component' }, pathMatch: 'full' },
  {
    path: 'login', component: LoginLayoutComponent, data: { title: 'First Component' },
    children: [
      { path: '', component: LogInComponent }
    ]
  },
  // {
  //   path: 'base', component: BaseLayoutComponent,
  //   children: [
  //     { path: '', redirectTo: 'view-products', pathMatch: 'full' },
  //     { path: 'view-products', component: ViewProductsComponent },
  //     { path: 'edit-products/:id', component: EditProductComponent },
  //     { path: 'view-measures', component: ViewMeasuresComponent },
  //     { path: 'edit-measures/:id', component: EditMeasureComponent },
  //     { path: 'create-measures', component: CreateMeasureComponent },
  //     { path: 'view-categories', component: ViewCategoriesComponent },
  //     { path: 'create-category', component: CreateCategoryComponent },
  //     { path: 'create-product', component: CreateProductComponent },
  //     { path: 'view-containers', component: ViewContainersComponent },
  //     { path: 'details-container/:id', component: DetailsContainerComponent },
  //     { path: 'view-users', component: ViewUsersComponent },
  //   ]
  // }
];

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    LoginLayoutComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [MatButtonModule, MatToolbarModule, MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
