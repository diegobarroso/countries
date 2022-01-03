import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ByCapitalComponent } from './pages/by-capital/by-capital.component';
import { ByNameComponent } from './pages/by-name/by-name.component';
import { ByRegionComponent } from './pages/by-region/by-region.component';
import { ViewCountryComponent } from './pages/view-country/view-country.component';
import { CardCountryComponent } from './components/card-country/card-country.component';
import { CountryDetailsComponent } from './components/country-details/country-details.component';
import { SearchComponent } from './components/search/search.component';
import { SortPipe } from './pipes/sort.pipe';

import { NgxPaginationModule } from 'ngx-pagination';
import { HomeComponent } from './pages/home/home.component';
import { CobeComponent } from './components/cobe/cobe.component';


@NgModule({
  declarations: [
    ByCapitalComponent,
    ByNameComponent,
    ByRegionComponent,
    ViewCountryComponent,
    CardCountryComponent,
    CountryDetailsComponent,
    SearchComponent,
    SortPipe,
    HomeComponent,
    CobeComponent
  ],
  exports: [
    ByCapitalComponent,
    ByNameComponent,
    ByRegionComponent,
    CardCountryComponent,
    ViewCountryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxPaginationModule
  ]
})
export class CountryModule { }
