import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component'
import { MarsPhotosComponent } from './features/mars-photo/components/component';
import { MarsWeatherPageComponent } from './pages/mars-weather-page/mars-weather-page.component';

export const routes: Routes = [
    {path: '', component: HomePageComponent },
    {path: 'mars-photos', component: MarsPhotosComponent },
    {path: 'mars-weather', component: MarsWeatherPageComponent}
];
