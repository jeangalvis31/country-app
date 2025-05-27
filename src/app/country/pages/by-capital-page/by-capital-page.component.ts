import { Component, inject, input, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountrySearchInputComponent } from "../../components/country-search-input/country-search-input.component";
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import {rxResource} from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'app-by-capital-page',
    imports: [CountryListComponent, CountrySearchInputComponent],
    templateUrl: './by-capital-page.component.html'
})
export class ByCapitalPageComponent { 

  router = inject(Router);

  countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';  


  query = signal(this.queryParam);

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({request}) => {
      if(!request.query) return of([]);

      this.router.navigate(['/country/by-capital'],{
        queryParams: {
          query: request.query
        }
      })

      return this.countryService.searchByCapital(request.query);
    },
  });





  //Hacerlo con resource que trabaja con promesas
/* 
  countryResource = resource({
    request: () => ({ query: this.query() }),
    loader: async({request}) => {
      if(!request.query) return [];

      return await firstValueFrom(
        this.countryService.searchByCapital(request.query)
      );
    },
  }); */


  //hacerlo con observables

/*   isLoading = signal(false);
  isError = signal<string | null>(null);
  countries = signal<Country[]>([]);

  onSearch(query:string){
    if(this.isLoading()) return;

    this.isLoading.set(true);
    this.isError.set(null);
    this.countryService.searchByCapital(query)
    .subscribe({
      next: (countries) => {
        this.isLoading.set(false);
        this.countries.set(countries);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.countries.set([]);
        this.isError.set(err);
      }
    })
  } */
}
