import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country';
import { GoToCountryService } from '../../services/go-to-country.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styles: []
})
export class CountryDetailsComponent {

  @Input() country!: Country;

  constructor(private goToCountryService: GoToCountryService) { }

  onGoToCountry(country: Country) {
    this.goToCountryService.onGoToCountry(country);
  }

}
