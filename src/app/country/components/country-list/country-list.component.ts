import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './country-list.component.html',
})
export class CountryListComponent { 

  countries = input<Country[]>();
}
