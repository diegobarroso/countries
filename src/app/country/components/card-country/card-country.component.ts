import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country';


@Component({
  selector: 'app-card-country',
  templateUrl: './card-country.component.html',
  styles: []
})
export class CardCountryComponent {

  p: number = 1;
  itemsPerPage: number = 6;
  
  @Input() countries: Country[] = [];

  scrollTop() {
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth'
    });
  }
}
