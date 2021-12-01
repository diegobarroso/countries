import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Country } from '../interfaces/country';
import { CountryService } from './country.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GoToCountryService {

  constructor(private countryService: CountryService,
              private router: Router) { }


  onGoToCountry(country: Country) {
    if (!country.borders) country.borders = [];
    const borders: string[] = [];
    this.countryService.getBorders(country.borders)
      .pipe(
        finalize(() => {
          localStorage.setItem('country', JSON.stringify(country));
          this.router.navigateByUrl('/country');
        })
      )
      .subscribe(countries => {
        countries.forEach(c => borders.push(c.flag + ' ' + c.name.common));
        country.borders = borders;
      },
      (error) => country.borders = []);
  }
}
