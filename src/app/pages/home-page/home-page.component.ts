import { Component, inject } from '@angular/core'
import { Router } from '@angular/router'

@Component({
    selector: 'home-page',
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
    private router: Router = inject(Router)

    navigateToMarsWeather(): void {
        this.router.navigate(['/mars-weather'])
    }

    navigateToMarsPhotos(): void {
        this.router.navigate(['/mars-photos'])
    }
}