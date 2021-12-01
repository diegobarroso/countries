import { Pipe, PipeTransform } from '@angular/core';
import { Country } from '../interfaces/country';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(countries: Country[]): Country[] {
    return countries.sort((a: Country, b: Country) => {
      if(a.name.common > b.name.common) return 1;
      else return -1;
    });
  }

}
