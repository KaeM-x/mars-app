import { Component, Input } from '@angular/core'

import { PhotoCardComponent } from '../photo-card/photo-card.component' 
import { ApiResponsePhotos } from '../../models/photos/api-response-photos.model'

@Component({
    selector: 'photo-card-list',
    templateUrl: './photo-card-list.component.html',
    styleUrl: './photo-card-list.component.scss',
    imports: [PhotoCardComponent]
})
export class PhotoCardListComponent {
    @Input() photos!: ApiResponsePhotos
}