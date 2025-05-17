import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component'
import { MarsPhotosComponent } from './features/mars-photo/components/component';

export const routes: Routes = [
    {path: '', component: HomePageComponent },
    {path: 'mars-weather', component: HomePageComponent },
    {path: 'mars-photos', component: MarsPhotosComponent }
];
