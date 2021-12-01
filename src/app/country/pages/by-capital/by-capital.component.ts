import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-capital',
  templateUrl: './by-capital.component.html',
  styles: [
  ]
})
export class ByCapitalComponent implements OnInit {

  term: string = '';
  error: boolean = false;
  countries: Country[] = [];

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    if (localStorage.getItem('byCapital')) {
      this.search(localStorage.getItem('byCapital')!);
    }
  }

  search(term: string) {
    localStorage.setItem('byCapital', term);
    this.error = false;
    this.term = term;
    this.countryService.getCountries(term, 'capital')
      .subscribe(countries => this.countries = countries,
        (err) => {
          this.error = true;
          this.countries = []
        });
  }

}
