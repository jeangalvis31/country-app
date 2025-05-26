import { Routes } from '@angular/router';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { CoyntryLayoutComponent } from './layouts/CoyntryLayout/CoyntryLayout.component';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { CountryPageComponent } from './pages/CountryPage/CountryPage/CountryPage.component';


export const countryRoutes: Routes = [
    {
        path: '', component: CoyntryLayoutComponent,
        children: [
            {
                path: 'by-capital', component: ByCapitalPageComponent
            },
            {
                path: 'by-country', component: ByCountryPageComponent
            },
            {
                path: 'by-region', component: ByRegionPageComponent
            },
            {
                path: 'by/:code', component: CountryPageComponent
            },
            {
                path: '**',
                redirectTo: 'by-capital'
            }
        ]
    },

];

export default countryRoutes;