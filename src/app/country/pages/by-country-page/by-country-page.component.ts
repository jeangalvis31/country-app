import { Component, inject, signal } from '@angular/core';
import { CountrySearchInputComponent } from "../../components/country-search-input/country-search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country-page',
  standalone: true,
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent { 
    countryService = inject(CountryService);
  
    isLoading = signal(false);
    isError = signal<string | null>(null);
    countries = signal<Country[]>([]);
  
    onSearch(query:string){
      if(this.isLoading()) return;
  
      this.isLoading.set(true);
      this.isError.set(null);
      this.countryService.searchByCountry(query)
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
    }
 }
