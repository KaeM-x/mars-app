import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { environment } from '../../../../environment'
import { ApiResponsePhotos } from '../models/photos/api-response-photos.model'

@Injectable({
    providedIn: 'root'
})
export class MarsPhotosService {
    private readonly http = inject(HttpClient)
    private readonly apiKey = environment.apiKey

    private readonly photoApiUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos"

    getPhotosByMartianSol(sol: number): Observable<ApiResponsePhotos> {
        return this.http.get<ApiResponsePhotos>(
            this.photoApiUrl + "?"
            + "sol=" + sol + "&"
            + "api_key=" + this.apiKey
        )
    }
}