import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Toast } from "materialize-css";
import { Location } from '@angular/common';

import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-view-country',
  templateUrl: './view-country.component.html',
  styles: [`
    .map {
      margin: .5rem;
    }
    img {
      max-width: 50%;
    }
  `
  ]
})
export class ViewCountryComponent implements OnInit {

  country!: Country;

  constructor(private router: Router,
              private location: Location) 
      {}
    

  ngOnInit(): void {
    if (localStorage.getItem('country')) {
      this.country = JSON.parse(localStorage.getItem('country')!);
    }
    else {
      new Toast({ html: 'No country selected!'});
      this.router.navigateByUrl('/');
    }
    window.scroll(0,0)
  }

  goBack() {
    this.location.back();
  }

}
