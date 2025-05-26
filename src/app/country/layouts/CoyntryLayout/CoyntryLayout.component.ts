import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CountryTopMenuComponent } from '../../components/country-top-menu/country-top-menu.component';

@Component({
    selector: 'app-coyntry-layout',
    imports: [RouterOutlet, CountryTopMenuComponent],
    templateUrl: './CoyntryLayout.component.html'
})
export class CoyntryLayoutComponent { }
