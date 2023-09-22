import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { Country } from '../interfaces/country';
import { cacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

    private apiUrl: string = 'https://restcountries.com/v3.1';

    public cacheStore: cacheStore = {
        ByCapital:   {term:   '',  countries: []},
        ByCountries: {term:   '' ,   countries: []},
        ByRegion:    {region: '', countries: []},
    }

    constructor(private http: HttpClient) { }

    private getCountriesRequest ( url: string ): Observable <Country[]>{

        return this.http.get<Country[]> ( url ).pipe (catchError( () => of ([]) ) );
    }


    searchCountryByAlphaCode ( code: string): Observable< Country | null> {

        return this.http.get<Country[]>(`${this.apiUrl}/alpha/${ code }`)
        .pipe ( map(countries => countries.length > 0 ? countries[0]: null),  catchError( () => of (null) ) );
    }


    searchCapital ( term: string ): Observable<Country[]> {

        const url = `${this.apiUrl}/capital/${ term }`;

        return this.getCountriesRequest(url).pipe(tap( countries => this.cacheStore.ByCapital = { term, countries} ));

    }


    searchCountry ( term: string ): Observable <Country[]> {
        const url = `${this.apiUrl}/name/${ term }`;

        return this.getCountriesRequest(url).pipe(tap( countries => this.cacheStore.ByCountries = { term, countries} ))
    }

    searchRegion ( region: Region ): Observable <Country[]> {
        const url = `${this.apiUrl}/region/${region }`;

        return this.getCountriesRequest(url).pipe(tap( countries => this.cacheStore.ByRegion = { region, countries} ));
    }
 
}

