import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormSelect } from "materialize-css";
import { switchMap, tap } from 'rxjs/operators';
import { Country } from '../../interfaces/country';
import { CountryService } from '../../services/country.service';
import { GoToCountryService } from '../../services/go-to-country.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
  /* select.default-browser {
    position: relative;
    cursor: pointer;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #9e9e9e;
    outline: none;
    height: 3rem;
    line-height: 3rem;
    width: 100%;
    font-size: 16px;
    margin: 0 0 8px 0;
    padding: 0;
    display: block;
    -webkit-user-select: none;
    user-select: none;
    z-index: 1;
  }
   */  
  `]
})
export class HomeComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    borders: ['', Validators.required]
  });

  regions: string[] = [];
  countries: Country[] = [];
  borders: string[] = [];

  selectedCountry!: Country | null;

  loading: boolean = false;


  constructor(private fb: FormBuilder,
              private countryService: CountryService,
              private gotoCountry: GoToCountryService) { }

  ngOnInit(): void {
    this.regions = this.countryService.regions;

    setTimeout(() => {
      let regionSelect = document.querySelectorAll('select.region')[0];      
      FormSelect.init(regionSelect, {
        classes: 'mt-5'
      });      
    }, 100);


    // When choosing a region
    this.myForm.get('region')?.valueChanges
        .pipe(
          tap((_) => {
            this.loading = true;
            this.selectedCountry = null;
            this.myForm.get('country')?.reset('');
            this.myForm.get('borders')?.reset('');
            this.borders = [];
          }),
          switchMap( region => this.countryService.getCountries(region, 'region'))
        )
        .subscribe(countries => {
          this.countries = countries;
          this.loading = false;
          setTimeout(() => {
            let countrySelect = document.querySelectorAll('select.country')[0];      
            FormSelect.init(countrySelect, {
              classes: 'mt-5'
            });      
          }, 100);
        });
    
    // When choosing a country
    this.myForm.get('country')?.valueChanges
        .subscribe(code => {
          this.loading = true;
          if (code !== '') {
            this.myForm.get('borders')?.reset('');
            this.selectedCountry = (this.countries.filter(country => country.cca3 === code))[0];
            this.borders = [];
            if (this.selectedCountry.borders) this.getBorderNames();
            this.loading = false;
          }
        });
  }

  private getBorderNames() {
    this.countryService.getBorders(this.selectedCountry!.borders)
                  .subscribe(borders => {
                    borders.forEach(c => this.borders.push(c.flag + ' ' + c.name.common));
                    setTimeout(() => {
                      let borderSelect = document.querySelectorAll('select.border')[0];      
                      FormSelect.init(borderSelect, {
                        classes: 'mt-5'
                      });      
                    }, 100);
                  });
  }

  selectCountry() {
    this.gotoCountry.onGoToCountry(this.selectedCountry!);
  }

}
