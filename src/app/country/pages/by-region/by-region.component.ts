import { Component, OnInit } from '@angular/core';

import { Country } from '../../interfaces/country';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-region',
  templateUrl: './by-region.component.html',
  styles: [`
    button {
      margin: 5px;
    }
  `
  ]
})
export class ByRegionComponent implements OnInit{

  regions: string[] = [];
  activedRegion: string = '';

  countries: Country[] = [];

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.regions = this.countryService.regions;
    
    if (localStorage.getItem('byRegion')) {
      this.activateRegion(localStorage.getItem('byRegion')!);
    }
  }

  activateRegion (region: string) {
    localStorage.setItem('byRegion', region);
    this.activedRegion = region;
    this.countries = [];
    this.countryService.getCountries(region, 'region')
      .subscribe(countries => this.countries = countries);
  }

}
