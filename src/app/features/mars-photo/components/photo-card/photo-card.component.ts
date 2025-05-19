import { Component, Input, OnInit } from '@angular/core'

@Component({
    selector: 'photo-card',
    templateUrl: 'photo-card.component.html',
    styleUrl: 'photo-card.component.scss',
})
export class PhotoCardComponent implements OnInit {
    @Input() imgSrc!: string

    backgroundImage!: string

    ngOnInit(): void {
        this.backgroundImage = "url(\"" + this.imgSrc +"\")"
    }
}