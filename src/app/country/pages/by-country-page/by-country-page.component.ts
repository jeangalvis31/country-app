import { Component, inject, resource, signal } from '@angular/core';
import { CountrySearchInputComponent } from "../../components/country-search-input/country-search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-by-country-page',
    imports: [CountrySearchInputComponent, CountryListComponent],
    templateUrl: './by-country-page.component.html'
})
export class ByCountryPageComponent { 
    countryService = inject(CountryService);
    activatedRoute = inject(ActivatedRoute);
    router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';  


  query = signal(this.queryParam);

  countryResource = resource({
    request: () => ({ query: this.query() }),
    loader: async({request}) => {
      if(!request.query) return [];

      this.router.navigate(['/country/by-country'],{
        queryParams: {
          query: request.query
        }
      })

      return await firstValueFrom(
        this.countryService.searchByCountry(request.query)
      );
    },
  });
 }
