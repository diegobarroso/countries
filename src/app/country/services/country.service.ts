import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private baseURL: string = 'https://restcountries.com/v3.1';
  
  constructor(private http: HttpClient) { }

  getCountries(term: string, path: string): Observable<Country[]> {
    const url: string = `${this.baseURL}/${path}/${term}`;
    const params = new HttpParams();
    
    return this.http.get<Country[]>(url);
  }

  getBorders(borders: string[]): Observable<Country[]>  {
    const codes = borders.join(',');
    const params = new HttpParams()
    .set('fields', 'name,flag')
    .set('codes', codes);
    
    const url: string = `${this.baseURL}/alpha`;
    
    return this.http.get<Country[]>(url, {params});
  }
}
