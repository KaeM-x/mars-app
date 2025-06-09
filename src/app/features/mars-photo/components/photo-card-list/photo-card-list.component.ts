import { Component, Input } from '@angular/core';
import { PhotoCardComponent } from '../photo-card/photo-card.component';
import { Photo } from '../../models/photos/photo.model';

@Component({
    selector: 'photo-card-list',
    templateUrl: './photo-card-list.component.html',
    styleUrls: ['./photo-card-list.component.scss'],
    standalone: true,
    imports: [PhotoCardComponent]
})
export class PhotoCardListComponent {
    @Input() photos: Photo[] = [];
}