import { Component, inject, OnInit } from '@angular/core'
import { MarsPhotosService } from '../../features/mars-photo/services/mars-photos.service'
import { ApiResponsePhotos } from '../../features/mars-photo/models/photos/api-response-photos.model'
import { PhotoCardListComponent } from "../../features/mars-photo/components/photo-card-list/photo-card-list.component";


@Component({
    selector: 'mars-photos',
    templateUrl: 'mars-photos-page.component.html',
    styleUrl: 'mars-photos-page.component.scss',
    imports: [PhotoCardListComponent],
})
export class MarsPhotosPageComponent implements OnInit {
    marsPhotosService = inject(MarsPhotosService)
    photos$!: ApiResponsePhotos

    ngOnInit(): void {
        const observer = {
            next: (data: ApiResponsePhotos) => {
                console.log(this.photos$ = data)
            },
            error: (err: Error) => console.error(err),
            complete: () => console.log('Data received correctly.')
        }
        this.marsPhotosService.getPhotosByMartianSol(3000).subscribe(observer)
    }
}