import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ByNameComponent } from './country/pages/by-name/by-name.component';
import { ByRegionComponent } from './country/pages/by-region/by-region.component';
import { ByCapitalComponent } from './country/pages/by-capital/by-capital.component';
import { ViewCountryComponent } from './country/pages/view-country/view-country.component';

const routes: Routes = [
  {
    path: '',
    component: ByNameComponent,
    pathMatch: 'full'
  },
  {
    path: 'region',
    component: ByRegionComponent
  },
  {
    path: 'capital',
    component: ByCapitalComponent
  },
  {
    path: 'country',
    component: ViewCountryComponent
  },
  {
    path: '**',
    redirectTo: ''
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
