import { Component, OnInit } from '@angular/core';

import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country';
import { GoToCountryService } from '../../services/go-to-country.service';


@Component({
  selector: 'app-by-name',
  templateUrl: './by-name.component.html',
  styles: [`
    li {
      cursor: pointer;
    }
  `
  ]
})
export class ByNameComponent implements OnInit {

  term: string = '';
  error: boolean = false;
  countries: Country[] = [];
  suggestedCountries: Country[] = [];

  constructor(private countryService: CountryService,
              private goToCountryService: GoToCountryService) { }

  ngOnInit(): void {
    if (localStorage.getItem('byName')) {
      this.search(localStorage.getItem('byName')!);
    }
  }

  search(term: string) {
    localStorage.setItem('byName', term);
    this.error = false;
    this.suggestedCountries = [];
    this.term = term;
    this.countryService.getCountries(term, 'name')
      .subscribe(countries => this.countries = countries,
        (err) => {
          this.error = true;
          this.countries = []
        });
  }

  suggestions(term: string) {
    
    this.error = false;
    this.term = term;
    
    this.countryService.getCountries(term, 'name')
      .subscribe(countries => {
        this.suggestedCountries = countries.splice(0,5);
      },
      (error) => this.suggestedCountries = []);
  }

  onGoToCountry(country: Country) {
    this.goToCountryService.onGoToCountry(country);
  }

}
