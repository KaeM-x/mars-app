import { Component, Input, OnInit } from '@angular/core'
import { Photo } from '../../models/photos/photo.model'

@Component({
    selector: 'photo-card',
    templateUrl: 'photo-card.component.html',
    styleUrl: 'photo-card.component.scss',
})
export class PhotoCardComponent implements OnInit {
    @Input() photo!: Photo

    backgroundImage!: string

    ngOnInit(): void {
        this.backgroundImage = "url(\"" + this.photo.img_src +"\")"
    }
}