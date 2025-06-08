import { Injectable, inject } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'

import { environment } from '../../../../environments/environment'
import { ApiResponsePhotos } from '../models/photos/api-response-photos.model'
import { PhotosQueryParams } from '../models/photos-query-params.model'

@Injectable({
    providedIn: 'root'
})
export class MarsPhotosService {
    private readonly http = inject(HttpClient)
    private readonly apiKey = environment.nasaApiKey

    private readonly photoApiUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos"

    getPhotos(params: PhotosQueryParams): Observable<ApiResponsePhotos> {
        let httpParams = new HttpParams()
        httpParams = httpParams.set('sol', params.sol.toString())
        httpParams = httpParams.set('page', params.page.toString())
        if(params.camera) {
            httpParams = httpParams.set('camera', params.camera)
        }

        httpParams = httpParams.set('api_key', this.apiKey)

        return this.http.get<ApiResponsePhotos>(
            this.photoApiUrl, { params: httpParams }
        )
    }
}