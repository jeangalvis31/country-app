import { Component, inject, resource, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { Region } from '../../interfaces/region.type';
import { rxResource } from '@angular/core/rxjs-interop';




@Component({
    selector: 'app-by-region-page',
    imports: [],
    templateUrl: './by-region-page.component.html'
})
export class ByRegionPageComponent {


    public regions: Region[] = [
        'Africa',
        'Americas',
        'Asia',
        'Europe',
        'Oceania',
        'Antarctic',
    ];

    countryService = inject(CountryService);
    selectedRegion = signal<Region | null>(null);

    selectRegion(region: Region) {
        this.selectedRegion.set(region);
    }


    countryResource = rxResource({
        request: () => ({ region: this.selectedRegion() }),
        loader: ({  request }) => {
            console.log(request)
            if (!request.region) return of([]);

            return this.countryService.searchByRegion(request.region)

        },
    });
}
