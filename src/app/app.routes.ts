import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component'
import { MarsPhotosPageComponent } from './pages/mars-photos-page/mars-photos-page.component';

export const routes: Routes = [
    {path: '', component: HomePageComponent },
    {path: 'mars-weather', component: HomePageComponent },
    {path: 'mars-photos', component: MarsPhotosPageComponent }
];
